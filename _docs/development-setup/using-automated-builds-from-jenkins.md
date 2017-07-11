---
title: "Using Automated Builds from Jenkins"
excerpt: ""
---
Jenkins provide continuous integration services to the dRonin project.  The continuous integration server can be accessed at http://ci.dronin.org/ .

{% capture contint %}
dRonin heavily uses continuous integration.  It is software that builds dRonin automatically.
* Official release builds of dRonin are produced by the continuous integration environment  
Using an automated builder ensures that the project is built consistently and reproducible.
* Nightly builds are produced of the development branch, with test binaries (\"artifacts\").  
This ensures the project can still be compiled (and that something hasn't broken behind the scenes) and provides regular test artifacts for developers and testers to use.
* Developers can request Jenkins to build artifacts for a pull request.  
This is useful because it allows people without build environments to test the proposed change.
* Jenkins does a minimal build and test (Linux-only, no artifacts) of every pull request.  
This prevents the project from accidentally merging a pull request that doesn't build.",
{% endcapture %}

{% include callout type="info_full" title="What's continuous integration?" text=contint %}

## The 'dRonin' job: artifact production:

The dRonin job is located here: [http://ci.dronin.org/job/dronin/](http://ci.dronin.org/job/dronin/)

{% include callout type="danger" title="Development builds are dangerous!" text="Current development code may have severe bugs.  It may brick your flight controller or cause a crash.  Development builds are only intended to be used in safe conditions by experienced testers." %}

The dRonin job is used for builds that produce artifacts (official releases, nightly builds, and triggered pull request builds.  It's a useful place to get the latest development code.

Here's an example view of the dRonin job's web page:

{% include figure image_path="/assets/images/docs/GM9OUQpFQiKYNsyAKlOb_jenky.png" alt="Jenkins dronin job" caption="Jenkins \"dronin\" job" %}

The important part of the page is the "build history" on the left.  In this example, there's several builds:

* \#288, \#287, \#285, \#284 were made at 5:03AM.  They are nightly builds of the latest development code.
* \#286 is a manually triggered developer build.  It has a lock next to it, indicating that Jenkins is not permitted to automatically erase it to save disk space.  Perhaps it is a beta or other specialized test release?
* \#283 is a build that was produced when a developer said `Jenkins, build artifacts please` in a comment on a Pull Request on GitHub.  It is a test of PR \#868.

All of the builds have blue dots next to them, indicating that they completed successfully.  If the build had failed (whether because of a problem with Jenkins or the code being integrated) the dot would be red.

If we click on #288, we can see the page for the individual build:

{% include figure image_path="/assets/images/docs/FM4RnLpSR2RR6s9VKEWS_jenky2.png" alt="Individual Jenkins build page" caption="Jenkins build page" %}

Ignore the changes information.  The useful part of the page is at the bottom.  There are three configurations:

* master: the Linux build environment that also produces Android GCS artifacts
* osx: the Mac OS X builder
* winx86: the builder for Windows

If we click 'master', we are taken to a page with the Linux artifacts:

{% include figure image_path="/assets/images/docs/T1NXSv1MQaiEfdIlCKtw_jenky3.png" alt="dRonin linux artifacts page" caption="Jenkins artifacts page" %}

and you can click on them to download and install them.

Alternatively, there is a pull-down menu that can be accessed to see build output, next to the configuration name:

{% include figure image_path="/assets/images/docs/aawM4DotS1Xqb6p3grLw_jenky4.png" alt="Viewing the build output for a specific builder" %}

From here, you can see the individual logs to determine why the build has failed.

## Using Jenkins from GitHub

As stated above, Jenkins automatically builds pull requests.  If one of these pull requests fails, you will see something like this on the pull request page:

{% include figure image_path="/assets/images/docs/FxRPovkGTtKDxOWDDjW6_buildfail.png" alt="Jenkins build failure message on GitHub" caption="Build failure message" %}

Click on 'Details' to go to a page where in turn you can click on Master's pulldown -> Console Output; in turn this will show you the build output so you can determine why the build failed.

You might also see something like this in the comments of a build request page:

{% include figure image_path="/assets/images/docs/B9K9prmCTfqR3q58Yn5Q_artifactsbuilt.png" alt="The comment the dRonin Jenkins builder leaves when artifacts are built." caption="Artifacts built comment" %}

In the above sequence, a developer requested that Jenkins build artifacts for this PR.  Links to the three sets of artifacts are in the post.  The artifacts in this build are a combination of the latest `next` development code with the changes in this pull request applied to it.
