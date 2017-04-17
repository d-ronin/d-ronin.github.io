---
title: "Configuring MWOSD for dRonin"
excerpt: ""
---
## Preparing OSD Firmware

While the CleanFlight version of MWOSD will work, there's some additional functionality that you get when you use a version compiled especially for dRonin (primarily, the display of alarms and errors).  To do this, follow these steps.  Note that a FTDI USB-to-serial cable is required for this procedure.

1. Download and install Arduino https://www.arduino.cc/en/Main/Software
2. Download the latest MWOSD source https://github.com/ShikOfTheRa/scarab-osd/releases/latest
3. Extract the MWOSD source to a location of your choice (e.g. Desktop)
4. Start Arduino, and open `<MWOSD source>/MW_OSD/MW_OSD.ino` (File > Open)
5. Switch tabs in the Arduino IDE to "Config.h"
6. Find `#define CLEANFLIGHT` and comment it out (add `//` in front)
7. Find `//#define TAULABS` and uncomment it (remove `//` in front)
8. Connect your microminimosd (or compatible) hardware via an FTDI (use all 6 pins)
9. In Arduino IDE, choose Tools > Board > Arduino Mini
10. Choose Tools > Port and select the FTDI
11. Choose Sketch > Upload
12. Wait for the compile and upload to complete and your OSD is ready
13. Connect power and video wires to the OSD as required for your hardware (refer to hardware documentation)
14. Connect OSD to one of the serial ports on your flight controller (use Rx and Tx pins)