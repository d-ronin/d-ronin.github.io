---
title: "Blink & Beep Codes"
excerpt: "DiDahDit"
---
There is a central subsystem used to control LED status notifications and buzzers called the "annunciator" subsystem.

{% include callout title="Adjusting alarm destinations" text="There is primitive support within the GCS for controlling where alarms are annunciated.  It can be found in Configuration →  Modules →  Annunciators." %}

By default, all alarms blink on the "heartbeat" LED if the hardware has one.  Everything of severity "warning" or worse blinks on the "alarm" LED as well.  Finally, alarms having to do with the radio subsystem beep through an attached buzzer on supported hardware, but only after arming has taken place (this avoids nuisance alarm beeps on powerup).

The following are the blink codes supported by the hardware:

| Sequence                         | Meaning                                       |
| — , — , —  …                     | Normal *(disarmed)*                           |
| •• , •• , ••   …                 | Normal *(armed)*                              |
| •—• , •—• , •—•  …               | No connection to radio *(failsafe)*           |
| —••• , —••• , —•••  …            | Battery status alarm                          |
| —•—• , —•—• , —•—•  …            | System configuration issue: <br/>attempting to arm in illegal mode (like AutoTune)<br/>or flight modes configured without associated module running |
| ——• , ——• , ——•  …               | GPS alarm                                     |
| •— , •— , •—   …                 | Other alarm not otherwise specified (connect GCS) |

There are also panic codes that happen at startup.  For these, generally only the error LED will blink.  They are repeated three times and then the flight controller reboots.  These usually indicate a hardware problem:

| Sequence                         | Meaning                                       |
| 2 blinks ( •• )                  | Failed to communicate with gyro               |
| 3 blinks ( ••• )                 | Failed to communicate with magnetometer (compass) |
| 4 blinks ( •••• )                | Failed to communicate with barometer (altimeter) |
| 5 blinks ( ••••• ) <br/>or 6 blinks ( •••••• ) | Flash chip or flash filesystem problem |
| 7 blinks ( ••••••• ) <br/>or 8 blinks ( •••••••• ) | Problems with I2C (internal or external) |
| 9 blinks ( ••••••••• )           | Failure to communicate via SPI                |
| 10 blinks ( •••••••••• )         | Failure to communicate via CAN                |
| 11 blinks ( ••••••••••• )        | Failed to initialize ADC                      |
| 12 blinks ( •••••••••••• )       | Failed to initialize On-Screen Display        |
