---
title: "Zero-downtime deploys on Azure App Service, and the bug that signed everyone out"
date: "2026-08-27"
author: "Justin Gu"
tags: ["Azure", "App Service", "GitHub Actions", "CI/CD", ".NET", "Blazor"]
category: "CI/CD"
kicker: "Azure App Service"
description: "How I set up staging slot swaps for a Blazor app so a deploy never interrupts anyone, and the Data Protection key problem that took a few swaps to understand."
---

## The problem I was trying to solve

The app I work on is a Blazor Server app that internal staff use all day. When I first wired up deploys, every push to main restarted the site. Users would see a spinner, lose the form they were filling in, and get signed out. People noticed. I got messages.

I wanted a deploy that nobody could feel. Here is what I ended up with and what I learned along the way.

## Slot swaps in one paragraph

Azure App Service lets you run a second copy of your site called a deployment slot. I named mine `staging`. The GitHub Actions workflow publishes the new build into the staging slot, Azure warms it up, and then I swap staging into production. The swap is a routing change, not a restart. The old build keeps serving until the new one is ready, and then traffic flips.

The pipeline has two jobs. The first builds and publishes the .NET project and uploads the output as an artifact. The second downloads that artifact, logs into Azure, deploys to the staging slot, and runs the swap.

```yaml
- name: Deploy to staging slot
  uses: azure/webapps-deploy@v3
  with:
    app-name: 'my-webapp'
    slot-name: 'staging'
    package: .

- name: Swap staging into production
  run: az webapp deployment slot swap -g my-rg -n my-webapp --slot staging --target-slot production
```

Azure pings a warm-up path on the staging slot until it answers 200. Only then does it swap. I pointed the warm-up at the login page, because if that page renders, the app has started, connected to the database, and loaded its configuration.

## Rollback is the same command

This was the part that sold me. After a swap, the previous build is sitting in the staging slot. If the new build is bad, I run the swap again and the old one is back in production. No rebuild, no hunting for an old artifact.

## No stored credentials

The workflow logs into Azure with OpenID Connect. GitHub mints a short-lived token for the run, and Azure has been told to trust tokens from this repo's main branch under a specific managed identity. There is no client secret in the repo settings to rotate or leak. It took one afternoon to set up and I have not thought about it since.

```yaml
permissions:
  id-token: write
  contents: read

- uses: azure/login@v2
  with:
    client-id: ${{ secrets.AZURE_CLIENT_ID }}
    tenant-id: ${{ secrets.AZURE_TENANT_ID }}
    subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

Those three values are identifiers, not secrets. They are in GitHub secrets out of habit more than need.

## The bug: every swap signed everyone out

The first few swaps went fine on my machine and badly for everyone else. The site stayed up, but every user got bounced to the login page.

The cause is ASP.NET Core Data Protection. It is the thing that signs the authentication cookie and the antiforgery tokens. By default it keeps its key ring in a file under the app's home directory. On App Service, each slot has its own home directory, and that directory travels with the slot during a swap. So after a swap, production was running with staging's key ring, which could not read the cookies production had issued. Every cookie looked forged, so every user was signed out.

The fix is to store the key ring somewhere both slots can see. I put it in a single blob in Azure Blob Storage.

```csharp
var storageConn = builder.Configuration["AzureStorage:ConnectionString"];
if (!string.IsNullOrEmpty(storageConn) && !string.IsNullOrEmpty(builder.Configuration["WEBSITE_SITE_NAME"]))
    builder.Services.AddDataProtection()
        .PersistKeysToAzureBlobStorage(storageConn, "dataprotection-keys", "keys.xml");
```

Two details that matter:

- The `WEBSITE_SITE_NAME` check means this only runs on App Service. A developer who has the storage connection string in user secrets would otherwise write into the production key ring from their laptop.
- The blob container has to exist before the app starts. The library creates the blob, not the container.

After this change, a swap is invisible. Sessions survive, forms survive, and I stopped getting messages.

## What I would tell someone starting this

Set up the slot and the swap first, before you think you need it. The swap itself is a few lines of YAML. The thing that will bite you is any state the app keeps on local disk, and the Data Protection key ring is the one everybody hits first. Put it in shared storage on day one.
