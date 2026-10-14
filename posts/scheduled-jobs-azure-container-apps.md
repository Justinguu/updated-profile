---
title: "Moving our scheduled jobs off a VM and into Azure Container Apps Jobs"
date: "2026-10-14"
author: "Justin Gu"
tags: ["Azure", "Container Apps", "Docker", ".NET", "Python", "Scheduled jobs", "Observability"]
category: "Containers"
description: "What it took to replace an always-on virtual machine full of cron jobs with containers that run on a schedule, and why I ended up building a control panel for them inside the main app."
---

## Where we started

For a long time our scheduled work lived on one virtual machine. Nightly data pulls, daily email runs, an on-call roster that texts people, a few jobs that pushed reports around. They were Python scripts on cron. The VM ran around the clock to do maybe an hour of real work a day, and every change meant someone logging in and editing files by hand.

It worked, mostly. The problems were the ones you would guess. Nobody could tell you from the outside whether last night's job ran. Updating a job meant touching a server. And we paid for 24 hours of compute to get 1.

## What we moved to

Azure Container Apps Jobs. Each job is a Docker image with a cron schedule attached. Azure starts a container at the scheduled time, runs it until the process exits, and tears it down. You pay for the minutes it runs. Our hosting cost for this work dropped by about 80 percent.

I started by containerizing the Python scripts as they were. That got us off the VM without rewriting anything. Later I ported seven of the jobs to .NET so they could share code with the main web app. The job that emails open orders, for example, now runs the exact same code path as the Send button on the web page. One bug fix lands in both places.

## One image, one job, one exit code

The contract between a job and Azure is the exit code. Zero means it did what it was supposed to, including "nothing was due today, so I did nothing." One means something failed. Azure records that and I can act on it.

I lean on that in the job itself. Every job accepts a few flags that make it safe to poke at:

- `--dry-run` plans the work and prints it, but sends and writes nothing.
- `--date 2026-09-24` pretends today is that date, so I can test a month-end rule on a Tuesday.
- `--force` runs on a day the schedule rule would skip.

Configuration comes from environment variables, which Container Apps fills from its secrets. The section names match the web app, so `Database__Host` means the same thing in both. If the email feature flag is off, every email goes to one test mailbox and the run stops after a handful of records. A job cannot accidentally email real customers from a test run.

## The Dockerfile lessons

Two things in the Dockerfile cost me real time and are worth sharing.

First, pin the runtime identifier when you publish. A portable publish ships native libraries for every platform, and through a transitive reference we were dragging in over 200 MB of image processing libraries we never used. Adding `-r linux-x64` took the published output from 273 MB to 81 MB.

```dockerfile
RUN dotnet publish jobs/MyJob/MyJob.csproj \
        -c Release -r linux-x64 --self-contained false -o /app
```

Second, install `tzdata` in the runtime image. Everything user-facing in our app is in Eastern time, and the job calls `FindSystemTimeZoneById("America/New_York")` on every run. The slim runtime image does not have the timezone database, so the job threw on startup until I added it.

## Deploying a job is a button, not a push

The web app deploys on every merge to main. The jobs deliberately do not. Each job has its own GitHub Actions workflow that is manual only. Merging code changes nothing in Azure until someone presses Run workflow. For jobs that send email to real people, that pause is a feature. The image that was last approved keeps running until we decide otherwise.

The workflow builds the image inside the container registry with `az acr build`, tags it with the date and the short commit SHA, and then patches the Container Apps job to point at the new tag. Schedule, secrets, and environment variables stay as they were. Only the image changes.

## The control panel I did not plan to build

Once there were a couple dozen jobs, the question "did it run last night" came up enough that I built a page for it inside the main web app.

It lists every job with its live status from Azure, its schedule translated into Eastern time, the image tag it is running, and its recent run history. A background service polls Azure every couple of minutes and writes every execution into Postgres, because Azure only keeps a short window of history and I wanted an archive.

A few rules came out of that work the hard way:

- A run is failed because Azure says it failed, never because a log line matched the word "Error". One healthy job printed a harmless Kerberos library warning for weeks. If I had been matching on logs, it would have been retried every night.
- An empty log query means "not yet", not "no reason". Log ingestion lags by a couple of minutes, so the first fetch after a failure usually finds nothing and the watcher tries again on the next tick.
- A suspended job is never retried. Suspended means a person stopped it on purpose.

Each job in the registry has a `retry_safe` flag. A nightly data pull can be re-run without harm, so the watcher re-runs it on failure. An email job cannot, because a second run emails everyone twice. That flag is set per job, by hand, and it is audited.

## Was it worth it

Yes, and not mainly for the cost. The cost drop was nice. The bigger change is that a job is now a thing I can see, test with a flag, deploy with a button, and roll back by pointing at the previous tag. The VM gave me none of that.
