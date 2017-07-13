---
title: "Programming ESCs with Passthrough"
excerpt: "How to use BLHeliConfigurator or BLHeliSuite with dRonin"
---

{% include callout type="danger" title="Remove props before ESC programming!" text="ESC programming generally requires battery power to be provided to the ESCs, and for unusual signals to be sent down the control line to the ESC.  Motors can accidentally begin spinning.  Ensure that **ALL PROPS** are removed from the vehicle prior to ESC programming and that wires and fingertips will not become entangled in motors if they begin to spin." %}

dRonin now supports programming ESCs using 4WIF-style passthrough.  The "MSP" module emulates the MultiWii/Cleanflight/Betaflight configuration interface.  BLHeli, BLHeli_S , BLHeli32, and SimonK ESCs can be reprogrammed.

First, it's important to configure the USB virtual com port to speak the MSP protocol.  On the hardware configuration page, select that port as "MSP" and turn off any other MSP ports used for on-screen displays.  (This configuration can be reversed after ESC programming to save resources and re-enable character OSD support).  Restart the flight controller.

{% include callout type="info" title="Battery power and ESC programming" text="Battery power must be provided for ESC programming.  On some ESCs, it is necessary to apply the battery power after connecting BLHeliConfigurator/BLHeliSuite." %}
Next, you may configure and program the ESCs.  Remove any props, connect the flight controller with USB, and apply battery power.

## With BLHeliConfigurator (recommended)

BLHeliConfigurator is a Chrome application that can be found [here](https://chrome.google.com/webstore/detail/blheli-configurator/mejfjggmbnocnfibbibmoogocnjbcjnk?hl=en).

BLHeliConfigurator only works with MSP-style passthrough, so setup is easy.  In BLHeliConfigurator, all that is necessary is to select the correct serial port at the upper right of the screen, click "Connect", and then "Read ESCs" at the bottom of the screen.

## With BLHeliSuite

Current revisions of BLHeliSuite can be downloaded from [here](https://www.mediafire.com/folder/dx6kfaasyo24l/BLHeliSuite) (be careful of obnoxious fake download links).  There are also some [manuals on GitHub](https://github.com/4712/BLHeliSuite/tree/master/Manuals).

After downloding and running BLHeliSuite, click the menu "Select Atmel/SiLabs Interface" and select "SILABS BLHeli Bootloader (CleanFlight)."  Choose the proper serial port connected to the flight controller at the bottom of the window, and then click "Connect".  Finally, after clicking "Read setup," you may configure the ESCs normally.
