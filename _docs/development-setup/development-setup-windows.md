---
title: "Development Setup: Windows"
excerpt: "So you want to be a dRonin?"
---
This page describes the procedures for setting up a Windows machine to compile dRonin firmware and GCS software. (More details on this are at [Tracking Development with Git](doc:tracking-development-with-git))
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
## Download Required Programs ##

[Git 2.6.4 or later](https://github.com/git-for-windows/git/releases) - The latest release should be fine.

Python 2.7.x - Get the latest Python **2.7.x** Anaconda distribution from https://www.continuum.io/downloads

Qt 5.6.1 (online installer) - http://download.qt.io/official_releases/online_installers/qt-unified-windows-x86-online.exe. Please __do not__ install a newer release, as it will not work. Qt provides much of the GUI framework behind GCS.  Also, the compiler and some necessary Unix command line tools are provided.

Microsoft Visual Studio 2015 Community Edition - https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx. __Do not__ install an older or newer release, as it will not work. MSVC is used to compile GCS on Windows.

## Install Required Programs ##
[block:callout]
{
  "type": "warning",
  "body": "The bash_profile used by dRonin is setup to use default install paths. Please keep default paths while installing tools unless you are prepared to edit the bash profile by hand. Read the following steps carefully to avoid problems.",
  "title": "Default Install Paths"
}
[/block]
1. Install git. Default options are okay. You will use this to clone the dRonin repository to your machine. It also provides a bash shell and other Unix-like tools.
2. Install Python 2.7.x Anaconda distribution. Default options are okay. Python is used at various stages in the build process for both GCS and firmware.
3. Install Qt SDK. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5275df8-qtstep1.png",
        "qtstep1.png",
        515,
        567,
        "#eec76b"
      ],
      "caption": "Step 1. Skip account login etc.\nStep 2. Use default installation folder."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fee4fcd-qtstep2.png",
        "qtstep2.png",
        516,
        941,
        "#edc86e"
      ],
      "caption": "Step 3. Deselect Qt / Qt 5.7 and anything else that is selected by default (optional).\nStep 4. Expand and select Qt / Qt 5.6 / msvc2015 32-bit.\nStep 5. Expand and select Tools / MinGW 4.9.2.\nStep 6. Accept license and shortcuts."
    }
  ]
}
[/block]
4. Install Visual Studio.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ad59ec4-step1.png",
        "step1.png",
        460,
        643,
        "#2a2a32"
      ],
      "caption": "Step 1. Leave default install location, choose \"Custom\" installation type."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5485a32-step2.png",
        "step2.png",
        460,
        643,
        "#27282d"
      ],
      "caption": "Step 2. Unselect default features (optional), expand \"Programming Languages\" and select \"Visual C++\"."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bb474b5-step2a.png",
        "step2a.png",
        459,
        643,
        "#28282e"
      ],
      "caption": "Step 3. Expand \"Windows and Web Development\", then \"Universal Windows App Development Tools\". Select \"Windows 10 SDK (10.0.10240)\" (PLEASE MAKE SURE YOU GET THIS EXACT VERSION)."
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dfa7a1a-step3.png",
        "step3.png",
        460,
        643,
        "#27272c"
      ],
      "caption": "Step 4. Install/accept UAC prompt."
    }
  ]
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "2. Checkout the dRonin repository and build"
}
[/block]
## Clone the source code repository ##

Start a shell using the "Git bash" program shortcut.

Next, clone the dRonin repository.  If you have your own fork, specify its URL on the git command line instead of the default URL below:

```
git clone git://github.com/d-ronin/dRonin.git
cd dRonin
```

Type these command to install a bash_profile suitable for developing the project: 

```
cp make/winx86/bash_profile ~/.bash_profile
chmod 755 ~/.bash_profile
```

You may have to edit bash_profile if you have changed any installation paths from the default. Then exit from the terminal using the command below.  Once the terminal has closed, start a new "Git bash" instance.

```
exit
```

## Automatic download and install of required programs ##

The dRonin build environment is capable of installing the rest of the tools that it needs.

Next change to the dRonin source directory, install the ARM SDK tools, openssl development libraries, and the zip compression tools used in packaging with the following commands.

```
cd dronin
make arm_sdk_install
make openssl_install
make zip_install
```

Next, it's necessary to configure qbs:

```
qbs setup-toolchains --detect
```

If you wish to build packages for distribution (not recommended unless you know what you're doing), you will also need to install breakpad.
```
make breakpad_install
```




[block:api-header]
{
  "type": "basic",
  "title": "3. Build the software"
}
[/block]
After this you can compile everything with the following commad!

```
make all
```
[block:api-header]
{
  "type": "basic",
  "title": "4. Run GCS"
}
[/block]
You can run GCS from the command line after a successful build by typing:

```
./build/ground/gcs/bin/drgcs
```