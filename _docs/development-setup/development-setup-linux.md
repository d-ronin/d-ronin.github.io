---
title: "Development Setup: Linux"
excerpt: "So you want to be a dRonin?"
---
{% include toc %}

Consider forking the project on GitHub before proceeding with this procedure if you intend to contribute back to the project.  (More details on this are at [Tracking Development with Git](doc:tracking-development-with-git))

## Build environment prerequisites

{% include callout type="warning_full" title="GCS Compiler Requirements" text="GCS requires a compiler with C++11 support. GCC 4.8, 4.9 and 5.3 are fully supported. Ubuntu release 14.04 or newer meet this requirement by default. See the [Qt supported platforms list](http://doc.qt.io/archives/qt-5.8/supported-platforms.html#supported-configurations) for further details." %}

### Ubuntu/Mint/Debian derived distributions

First ensure your package manager is up to date:

```
sudo apt-get update
```

Next, get a host compiler and other build tools, along with your revision control environment:

```
sudo apt-get install build-essential gdb wget debhelper ccache git
```

If you are running a 64-bit version of Linux (if you run `uname -m` and the output says `x86_64` you are in a 64-bit environment), you'll also need to install 32-bit compatibility libraries.

```
sudo apt-get install gcc-multilib
```

Finally, install some additional libraries required to compile GCS

```
sudo apt-get install zlib1g-dev libusb-1.0-0-dev libudev-dev libgl1-mesa-dev libpulse-dev
```

### Fedora (x64)

Install the required packages (tested on Fedora 26 Workstation):

```
    sudo dnf install libstdc++.i686 glibc-devel.i686 mesa-libGL-devel zlib-devel systemd-devel pulseaudio-libs-devel gcc gcc-c++ git ccache
```
For other Fedora-based distributions (e.g. CentOS) you may need to substitute `yum` for `dnf`.

## Fetching source code and building

### Cloning the repository

First, clone the dRonin repository.  Change to an appropriate directory to check out the code.  If you have your own fork, specify its URL on the git command line (otherwise you can use the parent fork per the below example).

```
git clone git://github.com/d-ronin/dRonin.git
cd dRonin
```

## Automatic download and install of prerequisites

The dRonin build environment is capable of installing the rest of the tools that it needs.

### GCS build tools

Next, run `make qt_sdk_install`, copy the path from the output in your terminal and paste it into the installer when prompted.

{% capture sdkinst %}
When running the qt sdk install command, you'll be told where to install qt, then the GUI installer will open. Here is what it will look like:

```
*** NOTE NOTE NOTE ***
*
*  In the GUI, please use exactly this path as the installation path:
*        /some/path/src/dRonin/tools/Qt5.8.0
*
*** NOTE NOTE NOTE ***
```

Be sure to copy the specified path into the installer when prompted for the install location!
{% endcapture %}

{% include callout type="warning_full" title="Don't install Qt to the default location!" text=sdkinst %}

GCS uses Google Breakpad for crash-reporting. Rather than compiling this every time you build GCS, it is built once during toolchain setup. Run `make breakpad_install`.

### Flight firmware build tools

This is easy.  Just type: `make arm_sdk_install`

{% capture flyingpi %}
FlyingPi requires additional steps to cross-compile the dRonin flight stack for arm-linux. See [setup guide](https://github.com/d-ronin/dRonin/wiki/User-Guide:-FlyingPI-Setup) for further information.
{% endcapture %}

{% include callout type="warning_full" title="Building for Raspberry Pi?" text=flyingpi %}

## Building the software

You should be ready to go. Type `make all` to compile the entire project. Type `make` to see a list of possible make arguments.

## Installing udev rules

You need to grant permission for normal users (ie. not root) to access your flight-controller boards from the GCS. This is accomplished by installing specific udev rules for the various flight controller boards.

The udev rules are generated dynamically (from the file shared/usb_ids/usb_ids.json). To generate dRonin udev rules, copy them to your system and load them, run these commands:

```
make usb_id_udev
sudo cp build/shared/usb_ids/dronin.udev /etc/udev/rules.d/45-dronin-permissions.rules
```
and then:
```
sudo udevadm control --reload-rules
```

{% capture replug_board %}
You must disconnect and reconnect devices if they were already plugged in when you loaded the udev rules.
{% endcapture %}

{% include callout type="info_full" title="Device still not accessible?" text=replug_board %}

## Running GCS

Launch the gcs with `./build/ground/gcs/bin/drgcs` and connect to/flash your board.
