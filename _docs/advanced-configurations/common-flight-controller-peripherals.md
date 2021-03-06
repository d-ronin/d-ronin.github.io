---
title: "Common Flight Controller Peripherals"
excerpt: "So you've got your aircraft flying, and you want to hook other stuff to it?  OK."
---
{% include toc %}

dRonin flight controllers have ports allowing you to connect a wide variety of "stuff" to it.  This page offers a brief treatment of what you might attach and how.

# Battery Monitoring

dRonin can monitor battery voltage, current, and expected remaining life, and prevent arming when a low battery is attached.  This battery data can also be reported over an on-screen display or radio receiver telemetry.

Most flight controllers have voltage and current sense pins, which can be used with an external battery monitoring board like the [Matek PDB-XPW](http://a.co/ehXGG5z), [AmpWings](https://github.com/Brotronics/AmpWings), or [AttoPilot](https://www.sparkfun.com/products/9028).

After reading the documentation for your battery monitoring board, and attaching the sensor's current and voltage sense leads to the flight controller's ADC lines, enable the battery module on the modules pane in GCS.

See [this wiki page](https://github.com/d-ronin/dRonin/wiki/User-Guide:-Battery-Configuration) for additional details.

# Radio Receiver Telemetry

dRonin supports sending telemetry data to FrSky and other radios.  Information about the flight, such as remaining battery, flight mode, position, and attitude can then be displayed on a Taranis.

There are a few different radio telemetry protocols (Wiki documentation is linked):

* [FrSky Sensor Hub (D8) telemetry used by many FrSky receivers (D4R-II, etc)](https://github.com/d-ronin/dRonin/wiki/User-Guide:-FrSKY-Sensor-Hub).
* [FrSky Smart Port (D16) telemetry used by advanced FrSky receivers (X4R-SB, X8R, etc)](https://github.com/d-ronin/dRonin/wiki/User-Guide:-FrSKY-S.PORT-telemetry)
* [Graupner HoTT telemetry](https://github.com/d-ronin/dRonin/wiki/User-Guide:-Graupner-HoTT-Telemetrie)

dRonin also speaks these protocols which are not typically used for receiver telemetry

* MSP (used for on-screen display / MWOSD)
* UAVTalk (the protocol used to speak to GCS)
* Mavlink (used for legacy on-screen display)

To use a telemetry protocol, first wire it to a flight controller port.  On STM32F3, you can usually wire the telemetry wires directly to the port.  On other flight controllers, an inverter is generally required.  Then, configure the specific port on the hardware pane to the protocol, save, and reset your flight controller.

# External On-Screen Display

It's recommended that you use [MWOSD](https://github.com/ShikOfTheRa/scarab-osd).  MWOSD is an on-screen display that runs on multiple types of hardware, including MiniMOSD, Micro-MiniMOSD, and OSDoge.

MWOSD speaks a protocol called Multiwii Serial Protocol (MSP), that dRonin also supports.  MSP was introduced by MultiWii and is also used by Baseflight and Cleanflight.

First, install MWOSD onto your OSD-- see [Configuring MWOSD for dRonin](doc:configuring-mwosd-for-dronin)  and wire the video signals through the OSD.  Next, go to the hardware pane in GCS.  Set the specific port on the hardware pane to "MSP", save, and reset the flight controller.

With luck, information on flight status is now on the on-screen display!

# Logging

dRonin flight controllers support logging detailed information about flight status and the internal workings of the system.  They can log this information to onboard flash or to an external OpenLog / [OpenLager](https://github.com/d-ronin/openlager/wiki) peripheral.

## Log target comparison

### Onboard flash

Pros:

* Already onboard many flight controllers; no additional hardware required
* Relatively fast

Cons:
* Not all FCs have it
* Downloading logs over USB can be very slow
* Onboard flash storage is very limited in size

### OpenLog

Pros:

* Commonly available logging peripheral logs to SD card

Cons:

* Relatively slow interface and small buffers limits limits log rates
* Subject to dropouts
* Consumes a flight controller serial port

### OpenLager

Pros:
* Really fast
* Logs to SD card
* Same form factor as OpenLog

Cons:
* Availability is presently limited
* Cost is a little higher than OpenLog because fancier parts are used in the design.

To use logging, first enable the logging module in the modules configuration.

Next, if you are using OpenLog or OpenLager, go to the hardware pane, and assign the device to a serial port.  Save, and return to the modules configuration.


{% include callout title="Viewing logs" text="The dRonin development environment contains a Python API and associated tools to do heavy lifting and analysis of recorded logs.<br/><br/>There's a lot of work underway on end-user log viewing and analysis tools.  In the meantime, there's an initial preview of a log viewing environment for Windows at http://jar.lyle.org/~mlyle/logview-20160910.zip" %}

On the logging sub-pane, you can adjust various parameters.  The default 'LogOnArm' and 'FullBore' logging profiles are generally what you want.  If you are using a serial logger, select the baud rate.  Generally OpenLog defaults to 115200 or 250000 bits per second, and OpenLager defaults to 2000000 bits per second.

If you are using OpenLager, feel free to turn up the logging rate.  This is the maximum number of times per second to log any of the data objects on the system (motor commands, gyro data, manual control input).  You can generally choose at least 250 without any problems.
