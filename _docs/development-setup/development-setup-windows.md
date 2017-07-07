---
title: "Development Setup: Windows"
excerpt: "So you want to be a dRonin?"
---
{% include toc %}

This page describes the procedures for setting up a Windows machine to compile dRonin firmware and GCS software. (More details on this are at [Tracking Development with Git](doc:tracking-development-with-git))

## Setting up prerequisites for the build environment

### Download Required Programs

[Git 2.6.4 or later](https://github.com/git-for-windows/git/releases) - The latest release should be fine.

Python 2.7.x - Get the latest Python **2.7.x** Anaconda distribution from https://www.continuum.io/downloads

Qt 5.6.1 (online installer) - http://download.qt.io/official_releases/online_installers/qt-unified-windows-x86-online.exe. Please __do not__ install a newer release, as it will not work. Qt provides much of the GUI framework behind GCS.  Also, the compiler and some necessary Unix command line tools are provided.

Microsoft Visual Studio 2015 Community Edition - https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx. __Do not__ install an older or newer release, as it will not work. MSVC is used to compile GCS on Windows.

### Install Required Programs

{% include callout type="warning" title="Default install paths" text="The bash_profile provided by dRonin is built to use default install paths. Please keep default paths while installing tools unless you are prepared to edit the bash profile by hand. Read the following steps carefully to avoid problems." %}

* Install git. Default options are okay. You will use this to clone the dRonin repository to your machine. It also provides a bash shell and other Unix-like tools.
* Install Python 2.7.x Anaconda distribution. Default options are okay. Python is used at various stages in the build process for both GCS and firmware.
* Install Qt SDK. 

{% include figure image_path="https://files.readme.io/5275df8-qtstep1.png" alt="Step 1" %}

* Skip account login etc.  
* Use default installation folder.

{% include figure image_path="https://files.readme.io/fee4fcd-qtstep2.png" alt="Step 2" %}

* Deselect Qt / Qt 5.7 and anything else that is selected by default (optional).  
* Expand and select Qt / Qt 5.8 / msvc2015 32-bit.  
* Expand and select Tools / MinGW 4.9.2.  
* Accept license and shortcuts.

* Install Visual Studio.

{% include figure image_path="https://files.readme.io/ad59ec4-step1.png" alt="VS Step 1" %}

* Leave default install location, choose "Custom" installation type.

{% include figure image_path="https://files.readme.io/5485a32-step2.png" alt="VS Step 2" %}

* Unselect default features (optional), expand "Programming Languages" and select "Visual C++".

{% include figure image_path="https://files.readme.io/bb474b5-step2a.png" alt="VS Step 3" %}

* Expand "Windows and Web Development", then "Universal Windows App Development Tools". Select "Windows 10 SDK (10.0.10240)" **(Make sure to get this exact version!)**)."

{% include figure image_path="https://files.readme.io/dfa7a1a-step3.png" alt="" caption="" %}

* Install/accept UAC prompt.

## Checking out the dRonin repository and building

### Clone the source code repository

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

### Automatic download and install of required programs 

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

## Building the software

After this you can compile everything with the following commad!

```
make all
```

## Running GCS

You can run GCS from the command line after a successful build by typing:

```
./build/ground/gcs/bin/drgcs
```
