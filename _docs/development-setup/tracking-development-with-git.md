---
title: "Tracking Development with Git"
excerpt: "Best practices when following and contributing to the dRonin repository"
---
Git is an extremely powerful distributed version control system that helps dRonin developers coordinate their work.  While there's a bit of a learning curve to begin using Git, it's well worth it.

{% include callout title="Concept: forks" text="Every developer (and many users) has their own fork (copy) of the dRonin code repository with its own history.  In this fork, changes can be made until they are \"ready\", when they can be submitted to the main dRonin fork as a pull request.<br/><br/>When dRonin accepts this pull request, the history associated with those changes is appended to the dRonin revision control history." %}

The individual Development Setup documentation pages (available for [Mac](/docs/development-setup/development-setup-os-x/), [Windows](/docs/development-setup/development-setup-windows/), and  [Linux](/docs/development-setup/development-setup-linux/)) document installing git and associated development tools.  This page instead covers best practices for how to maintain your git repository. 

It may also be helpful to run through the [tryGit tutorial](https://try.github.io/levels/1/challenges/1) to become familiar with the git command line tools.

## Obtaining your own fork of the GitHub repository

* [Create an account on GitHub](https://github.com/signup/free).
* Go to the [dRonin GitHub page](https://github.com/d-ronin/dronin).
* Click the fork button:
{% include figure image_path="/assets/images/docs/HjUJwe3dTBKhp96B926D_fork.png" alt="Fork button" %}

You will be taken to your fork's page.  At the top, there will be an URL for your fork, in the format `https://github.com/yourusername/dRonin.git` – note this URL.

{% capture clonedwarning %}
Then you already have a clone, and you need to adjust your "origin" remote to point to your fork.

Instead of the following two steps, do this:
```
cd dRonin
git remote add upstream https://github.com/d-ronin/dRonin.git
git fetch upstream
git remote remove origin
git remote add origin https://github.com/yourusername/dRonin.git
git fetch origin
```
{% endcapture %}

{% include callout type="warning_full" title="If you have already cloned from the main project..." text=clonedwarning %}

## Clone your fork locally

Follow the instructions for the development setup linked above, but when you clone the repository, provide your fork's URL:

```
git clone https://github.com/yourusername/dRonin.git
```

## Add a remote for the main (upstream) dRonin project

After you create and clone your own fork, it is helpful to be able to access the primary project repository as well.  To do this, execute the following commands:

```
git remote add upstream https://github.com/d-ronin/dronin.git
git fetch upstream
```

## Getting the latest next

Your local fork just contains a snapshot of the origin (your fork) and upstream repositories.  Later, to update it, just run these commands:

```
git fetch upstream
git checkout upstream/next
```

The first command (fetch) downloads all changes that have happened since last fetch; it does not change your working copy at all.  `git checkout upstream/next` replaces your working copy with the current code from `next`, dRonin's development branch.

You should usually clean the build environment after updating or changing branches:

```
make all_clean
```

## Retrieving and testing other pull requests

It is also helpful to be able to retrieve and test other peoples' pull requests.  There is a neat trick to make retrieving PRs easier from GitHub.  First, from your dRonin repository edit `.git/config`.  In the `[remote "upstream"]` section, add a new line that says:

```
        fetch = +refs/pull/*/head:refs/remotes/pr/*
```

After this, you can run a series of commands like:

```
git fetch upstream
git checkout upstream/next
git merge pr/1000
git merge pr/1100
```

to get source code of next with PRs 1000 and 1100 applied for testing.

## Set your user information

Git needs to know who you are so it can properly attribute your changes-- it won't let you commit until it's configured.  So go ahead and tell it:

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Beginning a new feature branch

If you've spotted a bug, want to adjust some text in the project to be clearer, or are looking to add a new feature: Thank you!  Here's how it works.

First, get the current development code, and clean your build environment:

```
git checkout upstream/next
make all_clean
```

Next, name your branch and begin your work:

```
git checkout -b myNiceBranch
```

This takes a virtual copy of the current branch (which should be current `next`), names it `myNiceBranch`, and checks it out into your `dRonin` directory.

You can now edit the source code files and make test builds.  For each logical work item within the branch, you can add the files you want to commit (whether they're new or just have changes) and then commit them:

```
git add flight/targets/cc4d/fw/mycoolcode.c Makefile
git commit
```

You'll be asked to type in a commit message.  The first line is expected to be a short subject line that indicates the subsystem of the code and is 50 characters or less; subsequent lines can describe the changes in greater detail:

```
flight: add support for the CC4D flight controller

mycoolcode is also added.  We're no longer confined to just three spatial dimensions.  
Fixes bug #123.
```

After this commit, you can continue working and producing additional change sets on this branch.

When the work is all done, you can run `git push` to send the contents of `myNiceBranch` to your fork on GitHub, and then visit your GitHub page to open a pull request for our review.

{% include callout type="warning_full" title="Advanced topics, not yet covered" text="Sometimes it's necessary to rebase, in order to get a clean revision history or to pick up changes from upstream.<br/><br/>For now, a brief tutorial on rebasing is [here](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)." %}
