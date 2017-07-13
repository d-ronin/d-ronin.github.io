---
title: "Writing Good Bug Reports"
excerpt: "We're broken?  :( Help us fix it."
---
If you've found something wrong, dRonin has an [issues database](https://github.com/d-ronin/dRonin/issues) that tracks known problems with the software.

{% include callout title="It's better to open a duplicate than to fail to report..." text="Searching the database to see if the issue already exists is helpful– preventing duplicate reports saves us all some work, and there may be information in the existing issue on workarounds.<br/><br/>However, it's more important that issues get reported so they can be fixed than duplicates prevented– it's easy to close a duplicate report and combine the information.  So don't worry **too** much about ruling out the presence of an existing bug report." %}

First, before reporting an issue, search the database a couple times with associated keywords you can think of to see if someone has already reported the issue.  If you find that the issue has already been reported, you can add your experiences to the comment thread.

When you report an issue, a developer is likely to take one of two different approaches to solve the issue:

1. Carefully scouring the associated code to see if there's a mechanism by which the failure you've seen can happen, or,
2. Attempting to reproduce the issue under controlled conditions to better understand and isolate the problem.

Hundreds of people have used this software successfully, and developers have used it a lot.  This means that there are paths to use the software that probably don't hit the problem you're concerned with; and developers have "trained themselves" not to get into trouble with the software.  For this reason, it's important in the issue that you **be as specific as possible in the steps you used to produce the problem**.  Explaining the steps needed to produce the problem in instructions that seem like they're meant for a small child is great, because otherwise it's likely that through the flawed  communication of text that the developer will end up trying something else.

Ideally you can provide with the issue an exact set of steps necessary to reproduce the problem.  But don't hesitate from opening an issue that describes an intermittent problem.

Provide as many details as possible as you can about the operating system, flight controller, and software version that you used to produce the problem.  Perhaps this is a new regression in the latest development code, or the problem has already been fixed through unrelated work.  If the problem involves interface to third party hardware (on-screen display, radio receivers, etc) please provide details on that hardware too.

With luck, a developer will be able to reproduce the problem and it'll be fixed in the next release!
