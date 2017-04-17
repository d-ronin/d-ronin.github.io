---
title: "Blink & Beep Codes"
excerpt: "DiDahDit"
---
The October 2016 ("Quixote") release of dRonin introduced a new "annunciator" subsystem used to blink LEDs and control buzzers.

By default, all alarms blink on the "heartbeat" LED if the hardware has one.  Everything of severity "warning" or worse blinks on the "alarm" LED as well.  Finally, alarms having to do with the radio subsystem beep through an attached buzzer on supported hardware, but only after arming has taken place (this avoids nuisance alarm beeps on powerup).

The following are the blink codes supported by the hardware:
[block:parameters]
{
  "data": {
    "h-0": "Sequence",
    "h-1": "Meaning",
    "1-0": "**•• , •• , •• **  …",
    "6-0": "** •— , •— , •— ** ...",
    "1-1": "Normal *(armed)*",
    "0-0": "**— , — , — ** …",
    "0-1": "Normal *(disarmed)*",
    "2-0": "**•—• , •—• , •—• **  …",
    "2-1": "No connection to radio *(failsafe)*",
    "3-0": "**—••• , —••• , —••• ** …",
    "3-1": "Battery status alarm",
    "4-0": "**—•—• , —•—• , —•—• ** …",
    "4-1": "System configuration issue-- attempting to arm in illegal mode (like AutoTune) or flight modes configured without associated module running",
    "5-0": "** ——• , ——• , ——• **  …",
    "5-1": "GPS alarm",
    "6-1": "Other alarm not otherwise specified (connect GCS)"
  },
  "cols": 2,
  "rows": 7
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Adjusting alarm destinations",
  "body": "There is not formal support in the UI, but alarm-to-annunciator routing can be altered by going into the UAVO browser on the GCS system pane and altering the values in Settings → AnnunciatorSettings ."
}
[/block]
There are also panic codes that happen at startup.  For these, generally only the error LED will blink.  They are repeated three times and then the flight controller reboots.  These usually indicate a hardware problem:
[block:parameters]
{
  "data": {
    "h-0": "Sequence",
    "h-1": "Meaning",
    "0-0": "2 blinks ( ** •• ** )",
    "0-1": "Failed to communicate with gyro",
    "1-0": "3 blinks ( ** ••• ** )",
    "1-1": "Failed to communicate with magnetometer (compass)",
    "2-0": "4 blinks ( ** •••• ** )",
    "2-1": "Failed to communicate with barometer (altimeter)",
    "3-0": "5 blinks ( ** ••••• ** ) or 6 blinks ( ** •••••• ** )",
    "3-1": "Flash chip or flash filesystem problem",
    "4-0": "7 blinks ( ** ••••••• ** ) or 8 blinks ( ** •••••••• **)",
    "4-1": "Problems with I2C (internal or external)",
    "5-0": "9 blinks ( ** ••••••••• **)",
    "5-1": "Failure to communicate via SPI",
    "6-0": "10 blinks ( ** •••••••••• **)",
    "6-1": "Failure to communicate via CAN",
    "7-0": "11 blinks ( ** ••••••••••• ** )",
    "7-1": "Failed to initialize ADC",
    "8-0": "12 blinks ( ** •••••••••••• ** )",
    "8-1": "Failed to initialize On-Screen Display"
  },
  "cols": 2,
  "rows": 9
}
[/block]