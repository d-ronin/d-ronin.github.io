---
title: "Configuring MWOSD for dRonin"
excerpt: ""
---
## Preparing OSD Firmware

While the Cleanflight version of MWOSD will work, there's some additional functionality that you get when you use a version compiled especially for dRonin (primarily, the display of alarms and errors).  To do this, follow these steps.  Note that a FTDI USB-to-serial cable is required for this procedure.

* Download prerequisites
  * Download and install Arduino https://www.arduino.cc/en/Main/Software
  * Download the latest MWOSD source https://github.com/ShikOfTheRa/scarab-osd/releases/latest
* Prepare the source code
  * Extract the MWOSD source to a location of your choice (e.g. Desktop)
  * Start Arduino, and open `<MWOSD source>/MW_OSD/MW_OSD.ino` (File > Open)
  * Switch tabs in the Arduino IDE to "Config.h"
* Select dRonin/Tau Labs
  * Find `#define CLEANFLIGHT` and comment it out (add `//` in front)
  * Find `//#define TAULABS` and uncomment it (remove `//` in front)
* Program the hardware
  * Connect your microminimosd (or compatible) hardware via an FTDI (use all 6 pins)
  * In Arduino IDE, choose Tools > Board > Arduino Mini
  * Choose Tools > Port and select the FTDI
  * Choose Sketch > Upload
  * Wait for the compile and upload to complete and your OSD is ready
* Complete installation
  * Connect power and video wires to the OSD as required for your hardware (refer to hardware documentation)
  * Connect OSD to one of the serial ports on your flight controller (use Rx and Tx pins)
  * Configure the serial port for "MSP"
