---
title: "Letting an LLM answer warehouse questions without letting it write SQL"
date: "2026-10-14"
author: "Justin Gu"
tags: ["AI", "LLM", "Claude API", "Tool use", ".NET", "PostgreSQL", "Blazor"]
category: "AI"
kicker: "Claude API tool use"
description: "I built two features on the Claude API for our operations platform: one that turns a sentence into a KPI dashboard, and one that answers questions from warehouse data. Neither one is allowed to write a query. Here is how that works."
---

## Why I did not let the model touch SQL

The first version of "ask a question about the warehouse" that I sketched out had the model write SQL. It is the obvious design, and it is a bad one for us. Our customer data is isolated per company, and that isolation is enforced in the queries. A model that writes its own SQL can write a query that forgets the company filter. I did not want to be the person explaining how one customer saw another customer's inventory.

So the rule for both features became: the model never writes a query. It picks from a catalog of metrics that I wrote, and the app runs them with the right scope bound in.

## The catalog

A metric is a named query with a title, a description, the chart types it suits, and whether it takes a window in days or a search term. There are a few dozen of them: inventory on hand, units expiring within a window, what happened to one serial number, that kind of thing.

The catalog does double duty. It is the list of things the app can run, and it is the list of things the model is allowed to ask for. When I build the tool definition for the model, the `metricId` field is an enum generated from the catalog. The two cannot drift, because there is only one list.

```csharp
["metricId"] = JsonSerializer.SerializeToElement(new { type = "string", @enum = AskMetricIds }),
```

## Feature one: a sentence becomes a dashboard

A manager types something like "show me expiring stock and this month's receipts". The model returns a dashboard spec as structured output: which metrics, which chart type for each, which window. The app validates it against the catalog and renders the tiles.

The model is choosing and arranging. It is not computing anything. Every number on the dashboard comes from the same query it would have come from if the manager had clicked through the menus.

## Feature two: answering a question with a tool loop

This is the one I find more interesting. A user asks a question in plain English, optionally with a photo of a product label attached. The model gets one tool, called `run_metric`. It can call that tool a few times, and then it has to answer.

The loop looks like this. The app sends the question. If the model responds with a tool call, the app parses the input, runs the catalog query with the current company's scope and business date, and sends the rows back as a tool result. The model reads the rows and either asks for another metric or writes the answer. After three rounds, the app sends one more request with tools switched off and takes whatever the model says.

```csharp
if (response.StopReason != "tool_use")
    return new AskResult(Text(response) ?? "", used, truncated);

// Every tool result goes back in one user message, or the API rejects the follow-up.
messages.Add(new() { Role = Role.User, Content = results });
```

The system prompt is strict about one thing: every figure in the answer must come from a tool result. No guessing. The data is a nightly snapshot, so the answer must state the business date it is as of. If the catalog has no metric that answers the question, the model is told to say so and name the closest one.

The answer comes back to the user with a list of which metrics were run and what each returned. If someone doubts a number, they can see exactly where it came from.

## The guard rails that are not about the model

Most of the engineering in this feature has nothing to do with prompts.

- **Row cap.** A tool result is cut at 200 rows and flagged as truncated. The model is told it was cut. Without this, one broad question could send a few megabytes of JSON into the context.
- **Daily cap per user.** Each person gets 30 calls a day, claimed atomically in Postgres so two browser tabs cannot both take the last one. This is a warning on the page, not an error.
- **Scope is a parameter, not a prompt.** The company, branches, and date range the user has selected are bound as SQL parameters on every run. They are described to the model as text so it knows what it is looking at, but it cannot widen them.
- **Images are limited.** Up to three, 5 MB each, common image types only. A photo of a label lets the model read a product code and serial and look the unit up, which turned out to be the feature people use most.
- **Cost is a constant.** The model id is one string. The current choice runs about a cent per dashboard and up to four cents per question. Swapping to a bigger model is one edit and roughly double the cost.

## The third use: a monthly summary nobody has to write

A separate, simpler feature reads one month of KPI numbers and writes five one-sentence takeaways for leadership. It runs in the background on page load when the stored month is stale, and the card shows the last saved version if generation fails. A lock makes sure several people loading the dashboard at once do not trigger five parallel calls, and a failed call backs off instead of retrying on every page view.

The prompt for that one is mostly a list of rules about what counts as a takeaway and an instruction to never invent a figure that is not in the input.

## What I would do the same way again

Everything about keeping the model away from the database. The catalog pattern cost me a day up front and has paid for itself every week since. New metric, new catalog entry, and the model can use it the next time someone asks. No prompt changes, no new risk.
