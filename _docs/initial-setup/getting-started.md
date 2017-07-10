---
title: "Getting Started"
layout: single
excerpt: "Installing the dRonin firmware and configuring for flight"
---
{% include toc %}

Once your have a dRonin compatible flight controller, it is time to get it configured and ready for flight. Please follow the steps in each section carefully and with attention to detail.

If you run into problems, consider joining the dRonin forum from the link at the top of this page.

## Installing the software

* Download the dRonin Ground Control Station from [here](https://github.com/d-ronin/dRonin/releases).
  * For Windows, you have the choice between a portable .zip file and an .exe installer that will install the software on your system.  If you don't know which you'd prefer, use the .exe.
  * On Linux, there is a .deb package for Debian derived distributions like Ubuntu; or a .tar.xz file for portable installation.
  * On Mac, a .dmg is provided; open it and drag the GCS to your Applications folder.  The first time you run GCS, you may have to right-click on 'dRonin GCS' and select "Open" to let the operating system know this is software you deliberately installed.
* Open GCS.  You will see a welcome screen:
{% include figure image_path="/assets/images/docs/AwOa7IQQtMXzjto9v4wh_welcome.png" alt="Welcome Screen" %}
* Plug in the flight controller using USB.  A window will pop up to monitor the upgrade process.

   If the controller was not previously running dRonin, you will see a dialog like this:
{% include figure image_path="/assets/images/docs/snZAPD6QbmBMKFco0j25_3e866128-f4e9-11e5-8807-ba48dd98d795.png" alt="Warning dialog" %}

   Select "Don't save" to start a clean configuration from scratch.   If instead you are upgrading a flight controller already running dRonin, please see [Upgrading an Existing Flight Controller](doc:upgrading-an-existing-flight-controller) .

   Follow the prompts, and dRonin will automatically be installed on the flight controller.

## Initial setup and tuning

### Using the Vehicle Setup Wizard

{% include callout type="danger" title="Caution" text="Subsequent steps will ask you to attach battery power to the controller. Remove all propellers from an aircraft during configuration.  During configuration, propellers can spin unexpectedly and cause serious injury." %}

dRonin contains a Vehicle Setup Wizard that simplifies configuring multirotor aircraft.  To use it, select "Vehicle Setup Wizard" from the "Tools" menu, and follow the prompts.  The wizard will help you:

* Configure the radio control input type
* Calibrate the sensors on the board for level
* Select the airframe type (quadcopter, hexcopter, etc.) and ESC configurations
* Set the minimum pulse duration for the outputs to ensure motors spin reliably

### Using the Radio Setup Wizard

dRonin also contains an Radio Setup Wizard that can be used to calibrate the radio control for the aircraft.  To use the Radio Setup Wizard, a radio receiver (rx) must be attached to the flight controller and bound to the transmitter.

Most flight controllers do not provide power to the radio receiver when powered only by USB.  Therefore, attach a battery to the aircraft.

{% include callout title="Transmitter and failsafe configuration" text="In order to use an arming switch or other optional channels, you may need to configure these channels on your transmitter.  Refer to your transmitter documentation for details.

It is also essential that you configure your radio receiver to not send any output when the radio connection is interrupted.  On FrSky receivers this is accomplished by pressing the bind button when the transmitter is turned off." %}

To start the wizard, select "Radio Setup Wizard" from the "Tools" menu.

Follow the prompts.  You will be instructed to move each channel in sequence, to center all channels, and to move all channels (including switches) to their maximum extents.  After completing input wizard be sure to click 'Save' on the input page.

### Remapping motors and setting board orientation

The Vehicle Setup Wizard assumes motors/ESCs are attached to the flight controller in a specific order. Note that the order differs from other flight controller firmwares like CleanFlight (see the [Naze32 page](doc:using-naze32#baseflight--cleanflight-motor-ordering-conventions) for details).  In the configuration interface, on the vehicle setup pane, it is possible to remap the motors without moving any wires.  Be sure to save after making any changes.

{% include figure image_path="/assets/images/docs/xt9q0CqnTjk9tqMIQVNc_outputmapping.png" alt="Output mapping on Vehicle screen" caption="Output mapping on Vehicle screen" %}

Some aircraft will require changes to board orientation on the 'attitude' config pane.  If the front of your flight controller does not face forward, make the appropriate changes there and then re-run level calibration.  Board orientation can be confirmed on the Flight Data screen; when the right side of the quadcopter faces the ground, the right side of the artificial horizon should be brown.

### Setting flight modes and preparing for AutoTune

After you have completed radio setup, the GCS will place you on the input configuration screen.

First, select "Arming Settings" at the top of the screen and select an arming setting.

{% include callout type="warning" title="Arming mode when using HangTime" text="If you are planning to use the HangTime feature, which allows your craft to maintain stabilization at low / zero throttle, it is recommended to use switch arming mode. Disarming with stick inputs can cause the motors to spin up while disarming." %}

If you have configured an arming switch, select "switch" and be sure to enable the calibrate gyros and "Throttle must be low before arming" options.  Otherwise, it is recommended you select "Yaw Left+Throttle".  In this case, holding the throttle down and the yaw control to the left side for a second will arm the flight controller.  Holding it to the right side for a second will disarm the flight controller.  Click "Save" to apply these settings to the flight controller.

{% include figure image_path="/assets/images/docs/a87064e-arming.png" alt="Arming Settings" caption="Arming Settings" %}

{% include callout type="warning" title="Test your arming setting!" text="If something goes wrong, immediately disarm!  Most times aircraft are lost or broken would be recoverable with little damage if the operator had decided to disarm promptly rather than try to \"save it.\"" %}

Next, select "Flight Mode Switch Settings."  At the upper-right corner of the screen, select the number of positions your flight mode switch has.  Configure one flight mode position for "Autotune" and the other flight mode positions to "Leveling" for your first flight.  In the upper right, select the number of positions that your flight mode switch has (usually 2 or 3).  Click "Save" to apply these settings to the flight controller".

{% include figure image_path="/assets/images/docs/Z7kgGtFFR4qBG7zWNUAl_flightmode.png" alt="Flight Mode Configuration" caption="Flight Mode Configuration" %}

Finally, on the left side of the screen, choose "Autotune".  Check the box at the bottom of the screen that says "Enable Autotune Module" and click "Save" to apply this setting to the flight controller.

### Verifying the configuration

Remove all power from the flight controller, re-connect the battery, and connect to GCS.  Ensure that the transmitter is powered and look at the alarms on the "Flight Data" pane (selected at the bottom of the screen).

If all is well, you should see something like this:

{% include figure image_path="/assets/images/docs/3YH8mYi8Qwa7gABJkEtb_systemhealth.png" alt="System Health Gadget" caption="System Health Gadget" %}

When you are satisfied with the configuration and all is well, unplug the USB connection and battery from the flight controller and attach propellers.

### Red / yellow module alarms

If a module is red, there is likely a problem with the associated portion of configuration.  Clicking on a module that is red or yellow (or x'd) usually provides additional details on the configuration problem.

If you see a System config alarm, it is possible that autotune was set as a flight mode without enabling the autotune module or the flight mode switch is set to the autotune position.  (It is not permitted to arm the craft with the switch in the autotune position)

### First flight and AutoTune

Take the aircraft to a field where there are few obstructions and no people around.

Arm the aircraft in leveling mode and take off (apply a small amount of throttle).  Ideally, the craft will be slightly undertuned and somewhat sluggish with default settings.  If the quadcopter shakes violently, land it and reduce the rate P gains on the stabilization pane.  Also confirm the board orientation and motor mapping.

If the aircraft flies well (but sluggishly), flip to the autotune flight mode.  The aircraft will then wobble for 60 seconds.  Your flight controls are still effective to control the quadcopter.  Let it do its thing, and when the wobbling stops, land it and disarm.  Autotune has measured the flight behavior of your aircraft but has not applied the settings yet; this requires using GCS. You can disconnect the battery at this point, as the AutoTune results have been stored in the flight controller.

### Applying AutoTune results

{% include callout title="Share your AutoTune results!" text="On the last page of the autotune wizard, there is a \"Share Tune and Vehicle Data to Cloud Service\" checkbox which lets you submit your results to the [AutoTune database](/tunes). Doing so helps developers improve the system.  It's also handy if you want to save your results for later or get support on IRC." %}

After your autotune flight, connect the flight board to GCS (no battery is necessary, so you can leave props on).  A wizard will automatically open inviting you to evaluate your autotune results.

The wizard will show you the measured parameters– which you can ignore.  Then, you can select damping and noise sensitivity coefficients.  For now, leave the sliders alone and continue through the wizard, which will save the new tune to the flight controller.  On flight controllers with limited resources, now is a good time to uncheck the autotune checkbox and remove the autotune flight mode.

Next, you can fly in leveling again.  If all is well, your aircraft should be much more responsive due to using ideal control system parameters.  You'll probably want to turn up stick rates next on the stabilization pane to match your style of flying.  If you're going to do flips and aggressive maneuvers, a max stick rate of at least 400 deg/sec is recommended on all axes.

If it is necessary to fly an autotune flight again (perhaps because you've changed the vehicle's physical configuration, or because the autotune measurement didn't work), it's recommended you first reset the inner and outer loop PIDs back to default on the stabilization settings pane.

## Final configuration

### Flight modes for "real" flight

So now you've completed AutoTune, and hopefully have an aircraft with perfect tuning!  The last things to do are to set the flight modes you'd like to fly, and adjust the rates for them.

First, on the configuration "input" page, select the flight modes you'd like.  Popular choices include:

* Leveling:  This is popular with new pilots, and is often helpful for line-of-sight flying.  Attitude mode automatically levels the aircraft when the sticks are centered and does not allow flips or rolls.
* Acro:  This is the most popular flight mode to fly FPV, which offers great, intuitive control.  Stick movement controls the **rate** at which the vehicle rolls or pitches.
* Horizon:  This mode is similar to leveling, but disables the leveling function when the stick is moved far from the center.  It is often used for line of sight maneuvers and learning to fly in rate mode.  However, it can also create bad habits.

There are other flight modes– describing them is beyond the scope of this document.  Some (like Altitude Hold) require specific sensors (like a barometer) and an associated module to be enabled.

Be sure to click 'save' after choosing your flight modes!

### Choosing control rates

After choosing your flight modes, be sure to save.

Second, it's important to set rates that allow for the type of flying you'll be doing.  These control rates are used in acro or horizon modes (only the yaw component is used for leveling).  They are configured on the basic stabilization pane in configuration:

{% include figure image_path="/assets/images/docs/5ab6268-rates.png" alt="Setting rates" %}

Click the checkboxes to link roll with pitch and yaw, because generally it is preferred to fly the same rates on all 3 axes.  While you are adjusting rates, the shape of the stick response will show on the graph at right.

Next, select a "full-stick rate".  This controls how quickly the aircraft will pitch or roll when the control stick is moved all the way to one side.  If you select 360 degrees/second, it will take approximately one second to complete a roll.  If you are starting out in rate mode, you might want to begin with a value between 350 and 500 and can turn it up if you find you want to roll or pitch faster than this allows.

After this, you can select a center slope.  The rate curve mapping allows the stick to be a little less sensitive near the middle to enable more precise control.  The center slope parameter controls how sensitive the stick is near the middle of its travel.  Almost all pilots prefer a value between 150 and 250.

Finally, you can set how wide this region of precise control is.  Default expo results in a linear transition of 21%, but most pilots prefer a value between 30 and 40%.

Make sure to save after selecting your rates.
