---
title: "Development Setup: Linux"
excerpt: "So you want to be a dRonin?"
---
Consider forking the project on GitHub before proceeding with this procedure if you intend to contribute back to the project.  (More details on this are at [Tracking Development with Git](doc:tracking-development-with-git))
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
## Ubuntu/Mint/Debian based distributions ##

First ensure your package manager is up to date:

```
sudo apt-get update
```

Next, get a host compiler and other build tools, along with your revision control environment:

```
sudo apt-get install build-essential gdb wget debhelper ccache git libpulse-dev
```

If you are running a 64-bit version of Linux (if you run `uname -m` and the output says `x86_64` you are in a 64-bit environment), you'll also need to install 32-bit compatibility libraries. 

```
sudo apt-get install gcc-multilib
```
[block:callout]
{
  "type": "info",
  "title": "GCC C++11 Support",
  "body": "GCS requires C++11 support through the flag `-std=c++11` which was introduced in GCC 4.7. Ubuntu release 14.04 or newer meet this requirement by default. \n\nIf you're not sure, you can run `g++ --version` and ensure the output denotes version 4.7 or newer. If not you will need to upgrade your compiler. On Ubuntu:\n```\nsudo add-apt-repository ppa:ubuntu-toolchain-r/test\nsudo apt-get update\nsudo apt-get install gcc-5\nwhich gcc | readlink -f\n```\nNote down the output of readlink, it should look like `/usr/bin/gcc4.*`, substitude 4.* for your version in the first command here:\n```\nsudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.* 100 --slave /usr/bin/g++ g++ /usr/bin/g++-4.*\nsudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 50 --slave /usr/bin/g++ g++ /usr/bin/g++-5\nsudo update-alternatives --config gcc\n```\nChoose GCC 5 at the prompt. You can easily switch between compilers at any time (e.g. if you want to compile something other than GCS) by running:\n```\nsudo update-alternatives --config gcc\n```\n\nIf you're running a 64-bit version of Linux, you will also need:\n```\nsudo apt-get install gcc-5-multilib\n```"
}
[/block]


Finally, install some additional libraries required to compile GCS

```
sudo apt-get install zlib1g-dev libusb-1.0-0-dev libudev-dev libgl1-mesa-dev libpulse-dev
```

## Fedora-based Distributions ##

Install the required packages:

```
    sudo dnf install libstdc++.i686 gcc-c++ ccache
    sudo dnf install libusb-devel qt5-qtdeclarative-devel qt5-qtimageformats qt5-qtserialport-devel qt5-qtsvg-devel qt5-qtxmlpatterns-devel SDL-devel systemd-devel zlib-devel
```
[block:api-header]
{
  "type": "basic",
  "title": "2. Check out the dRonin repository and build"
}
[/block]
## Clone the source code repository ##

First, clone the dRonin repository.  Change to an appropriate directory to check out the code.  If you have your own fork, specify its URL on the git command line (otherwise you can use the parent fork per the below example).

```
git clone git://github.com/d-ronin/dRonin.git
cd dRonin
```

## Automatic download and install of required programs ##

The dRonin build environment is capable of installing the rest of the tools that it needs.

### Qt build tools

Next, run `make qt_sdk_install`, copy the path from the output in your terminal and paste it into the installer when prompted.
[block:callout]
{
  "type": "danger",
  "title": "Do not install Qt to the default location!",
  "body": "When running the qt sdk install command, you'll be told where to install qt, then the GUI installer will open. Here is what it will look like:\n\n```\n*** NOTE NOTE NOTE ***\n*\n*  In the GUI, please use exactly this path as the installation path:\n*        /some/path/src/dRonin/tools/Qt5.5.1\n*\n*** NOTE NOTE NOTE ***\n```\n\nBe sure to copy the specified path into the installer when prompted for the install location!"
}
[/block]
### Arm cross compilation toolchain

This is easy.  Just type: `make arm_sdk_install`

[block:api-header]
{
  "type": "basic",
  "title": "3. Build the software"
}
[/block]
You should be ready to go. Type `make all` to compile the entire project. Type `make` to see a list of possible make arguments. 
[block:api-header]
{
  "type": "basic",
  "title": "4. Install udev rules"
}
[/block]
You need to grant permission for normal users (ie. not root) to access your flight-controller boards from the GCS. This is accomplished by installing specific udev rules for the various flight controller boards.

Check if your user is in the group "plugdev" by running 'groups'
[block:callout]
{
  "type": "warning",
  "title": "If you're not in group \"plugdev\"...",
  "body": "If you're not in the group \"plugdev\", you can add the group to your user by running this command:\n\n```\nsudo usermod -a -G plugdev user\n```\n\nThen, log-out and log back in and check again by running `groups`"
}
[/block]
Next, run these commands to install the dRonin udev rules:

```
sudo cp package/linux/deb/_package.udev /etc/udev/rules.d/45-dronin-permissions.rules
sudo udevadm control --reload-rules
```
[block:api-header]
{
  "type": "basic",
  "title": "4. Run GCS"
}
[/block]
Launch the gcs with `./build/ground/gcs/bin/drgcs` and connect to / flash your board.