---
title: "Using Automated Builds from Jenkins"
excerpt: ""
---
Jenkins provide continuous integration services to the dRonin project.  The continuous integration server can be accessed at http://ci.dronin.org/ .
[block:callout]
{
  "type": "info",
  "body": "dRonin heavily uses continuous integration.  It is software that builds dRonin automatically.\n\n* Official release builds of dRonin are produced by the continuous integration environment  \nUsing an automated builder ensures that the project is built consistently and reproducible.\n* Nightly builds are produced of the development branch, with test binaries (\"artifacts\").  \nThis ensures the project can still be compiled (and that something hasn't broken behind the scenes) and provides regular test artifacts for developers and testers to use.\n* Developers can request Jenkins to build artifacts for a pull request.  \nThis is useful because it allows people without build environments to test the proposed change.\n* Jenkins does a minimal build and test (Linux-only, no artifacts) of every pull request.  \nThis prevents the project from accidentally merging a pull request that doesn't build.",
  "title": "What's continuous integration?"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "The 'dRonin' job: artifact production"
}
[/block]
The dRonin job is located here: http://ci.dronin.org/job/dronin/

The dRonin job is used for builds that produce artifacts (official releases, nightly builds, and triggered pull request builds.  It's a useful place to get the latest development code.
[block:callout]
{
  "type": "danger",
  "title": "Development builds are dangerous!",
  "body": "Current development code may have severe bugs.  It may brick your flight controller or cause a crash.  Development builds are only intended to be used in safe conditions by experienced testers."
}
[/block]
Here's an example view of the dRonin job's web page:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/GM9OUQpFQiKYNsyAKlOb_jenky.png",
        "jenky.png",
        "750",
        "597",
        "#825b53",
        ""
      ],
      "caption": "Jenkins \"dronin\" job"
    }
  ]
}
[/block]
The important part of the page is the "build history" on the left.  In this example, there's several builds:

* \#288, \#287, \#285, \#284 were made at 5:03AM.  They are nightly builds of the latest development code.
* \#286 is a manually triggered developer build.  It has a lock next to it, indicating that Jenkins is not permitted to automatically erase it to save disk space.  Perhaps it is a beta or other specialized test release?
* \#283 is a build that was produced when a developer said `Jenkins, build artifacts please` in a comment on a Pull Request on GitHub.  It is a test of PR \#868.

All of the builds have blue dots next to them, indicating that they completed successfully.  If the build had failed (whether because of a problem with Jenkins or the code being integrated) the dot would be red.

If we click on #288, we can see the page for the individual build:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/FM4RnLpSR2RR6s9VKEWS_jenky2.png",
        "jenky2.png",
        "850",
        "549",
        "#7b4c45",
        ""
      ],
      "caption": "Jenkins build page"
    }
  ]
}
[/block]
Ignore the changes information.  The useful part of the page is at the bottom.  There are three configurations:

* master: the Linux build environment that also produces Android GCS artifacts
* osx: the Mac OS X builder
* winx86: the builder for Windows

If we click 'master', we are taken to a page with the Linux artifacts:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/T1NXSv1MQaiEfdIlCKtw_jenky3.png",
        "jenky3.png",
        "825",
        "227",
        "#1e2c54",
        ""
      ],
      "caption": "Jenkins artifacts page"
    }
  ]
}
[/block]
and you can click on them to download and install them.

Alternatively, there is a pull-down menu that can be accessed to see build output, next to the configuration name:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/aawM4DotS1Xqb6p3grLw_jenky4.png",
        "jenky4.png",
        "444",
        "463",
        "#948260",
        ""
      ]
    }
  ]
}
[/block]
From here, you can see the individual logs to determine why the build has failed.
[block:api-header]
{
  "type": "basic",
  "title": "Using Jenkins from GitHub"
}
[/block]
As stated above, Jenkins automatically builds pull requests.  If one of these pull requests fails, you will see something like this on the pull request page:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/FxRPovkGTtKDxOWDDjW6_buildfail.png",
        "buildfail.png",
        "875",
        "287",
        "#395171",
        ""
      ],
      "caption": "Build failure message"
    }
  ]
}
[/block]
Click on 'Details' to go to a page where in turn you can click on Master's pulldown -> Console Output; in turn this will show you the build output so you can determine why the build failed.

You might also see something like this in the comments of a build request page:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/B9K9prmCTfqR3q58Yn5Q_artifactsbuilt.png",
        "artifactsbuilt.png",
        "875",
        "339",
        "#9b8665",
        ""
      ],
      "caption": "Artifacts built comment"
    }
  ]
}
[/block]
In the above sequence, a developer requested that Jenkins build artifacts for this PR.  Links to the three sets of artifacts are in the post.  The artifacts in this build are a combination of the latest `next` development code with the changes in this pull request applied to it.