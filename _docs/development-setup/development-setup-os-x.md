---
title: "Development Setup: OS X"
excerpt: "So you want to be a dRonin?"
---
Building on OS X is relatively easy.  Consider forking the project on GitHub before proceeding with this procedure if you intend to contribute back to the project.  (More details on this are at [Tracking Development with Git](doc:tracking-development-with-git))
[block:callout]
{
  "type": "danger",
  "title": "Make sure you're using the correct version of these docs!",
  "body": "This documentation is for building the particular release in question.  Most of the time, it's preferable to build from the development branch.  If the version at the top of the page does not read v99-dev, please select that version before continuing,"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "1. Set up prerequisites for the build environment"
}
[/block]
## Get Homebrew ##

Homebrew is a package manager; it's the best way to get some of the prerequisites to build dRonin.

In a [terminal](http://www.google.com/search?q=osx+terminal+tutorial) window, paste this magical incantation:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

and then:

```
brew doctor
```

Then, you can use homebrew to install wget:

```
brew install wget
```

## Download Required Programs ##

Xcode. If you do not already have Xcode, the latest version can be obtained from the Apple app store.

After this, start Xcode and go through the initial setup. Once Xcode is running, go to Xcode > Preferences > Downloads > Components and install "Command Line Tools".
[block:api-header]
{
  "type": "basic",
  "title": "2. Check out the dRonin repository and build"
}
[/block]
## Clone the source code repository ##

First, clone the dRonin repository.  If you have your own fork, specify it on the git command line.

```
git clone git://github.com/d-ronin/dRonin.git
cd dRonin
```

## Automatic download and install of required programs ##

The dRonin build environment is capable of installing the rest of the tools that it needs.

### Qt build tools
[block:callout]
{
  "type": "warning",
  "title": "Remove existing Qt build locations!",
  "body": "If you have brew installed qt previously, unlink it now. If you get link errors building uavobjects, this is probably what is wrong:\n\n```\nbrew unlink qt\n```"
}
[/block]
Next, run `make qt_sdk_install`, copy the path from the output in your terminal and paste it into the installer when prompted.
[block:callout]
{
  "type": "danger",
  "title": "Do not install Qt to the default location!",
  "body": "When running the qt sdk install command, you'll be told where to install qt, then the GUI installer will open. Here is what it will look like:\n\n```\n*** NOTE NOTE NOTE ***\n*\n*  In the GUI, please use exactly this path as the installation path:\n*        /some/path/src/dRonin/tools/Qt5.5.1\n*\n*** NOTE NOTE NOTE ***\n```\n\nBe sure to copy the specified path into the installer when prompted for the install location!"
}
[/block]
### Arm cross compilation toolchain

This is easy.  Just type: 

```
make arm_sdk_install
```
[block:api-header]
{
  "type": "basic",
  "title": "3. Build the software"
}
[/block]
You should be ready to go. Type `make all` to compile the entire project. Type `make` to see a list of possible make arguments. Use 'make package' to create a .dmg containing everything, ready to install.
[block:api-header]
{
  "type": "basic",
  "title": "4. Run GCS"
}
[/block]
Launch the gcs with `open build/ground/gcs/bin/dRonin-GCS.app` and connect to / flash your board.
[block:api-header]
{
  "type": "basic",
  "title": "5. Eclipse Setup (Optional)"
}
[/block]
Extract the eclipse project:

```
pushd flight/Project/Eclipse
unzip eclipseLinuxWsp.zip -d eclipseLinuxWsp
mv eclipseLinuxWsp/.metadata ../../../
mv eclipseLinuxWsp/.cproject ../../
mv eclipseLinuxWsp/.project ../../
mkdir ../../../tools/eclipseWorkspace
```

Install eclipse, use the `Eclipse Installer`: https://eclipse.org/downloads/

Choose the `Eclipse IDE for C/C++ Developers` when prompted

When Eclipse starts, choose the folder you created in `[Your Project Root]/tools/eclipseWorkspace` as the workspace directory.

Then choose `File` -> `Import` and pick `Import an Existing Project`. Choose your project root directory, which is the same place you checked out the project with git.

You'll see the two projects `android gcs` and `flight` appear. Hit `Finish` and you're good to go!