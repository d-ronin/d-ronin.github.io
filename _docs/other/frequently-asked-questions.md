---
title: "Frequently Asked Questions"
excerpt: "You've got questions?  It's possible we have answers."
---
### Things feel sluggish after autotune– how can I make it snappier?

Make sure you've turned up your rates on the stabilization pane!  Try 450 deg/sec with a center stick rate of 180 deg/sec to start... and if you like that, turn the maximum rates up higher.

### I'm getting bad AutoTune results.  What should I try next?

Sadly, while AutoTune works well for most people it doesn't work well for all vehicles.  Each release has made improvements, and we expect the next release to be substantially better on F3 and F4 flight controllers.

That being said, there are some tips that often help:

* Don't stack AutoTunes.  AutoTunes should be made from default tuning (there is a button on the stabilization pane to reset PIDs to default; be sure to do this for both the inner and outer loop), or...
* Sometimes it is necessary to even turn down the default tuning.  If your multirotor is prone to oscillate in leveling mode on the defaults, turn down the inner loop PID coefficients on the stabilization pane.  The default values are 20/15; perhaps try 12/15 for a starting point.
* Sometimes reducing motor input/output curve fit on the bottom of the stabilization pane to 0.80 from the default 0.9 allows AutoTune to get a good system measurement.

### Yaw is sluggish and wanders around  Is there any way to improve this?

There is a checkbox when applying AutoTune to adjust Yaw as well– make sure to check it.  This is only applicable if AutoTune got a good measurement of yaw, which doesn't always happen (see the above tips for more info).

### How do I setup Air Mode?  What's "HangTime"?

On the stabilization pane, "Advanced", enable HangTime.

HangTime achieves similar (some would say better) results than Air Mode in that it allows you to engage in maneuvers while at zero throttle.  For safety, it also has limits on its operation.

First, HangTime makes sure to never add more than a configured percentage of throttle to avoid excessive floating and fly-aways.  The "Maximum Power Add" should be set to well under your hover power percentage.

Second, it isn't controlled with a switch like Air Mode.  Instead, it is enabled for a limited, configured time after throttle is lowered to zero.

It's strongly recommended to use HangTime that you sure switch arming.  This is for two reasons:

* If you're doing slow, floating maneuvers, you could hit the disarm sequence in flight.  Throttle is already zero, so it would be easy to yaw or roll in a way that causes a disarm.  This is not fun.
* You don't want the aircraft to respond to a stick disarming command while landing.

### Should I use MultiShot? If so, how do I set it up?

We do not recommend MultiShot or OneShot42.  OneShot125 already updates much faster than the actual response time of multirotors and propeller dynamics, and the shorter signal is more vulnerable to noise.

However, by popular demand, the setup wizard supports selecting OneShot42.  Additionally, it is possible to configure output timings on the output pane to OneShot42 (42 to 83us) or MultiShot timings.

### Should I use PWM, PPM or S.Bus for receiver connection?

Serial RX (e.g. S.Bus or iBus) is best.  PPM introduces more latency and consumes a timer resource on the microcontroller.

PWM uses lots of resources, is only supported by some flight controllers, and uses lots of wiring.  Therefore it is not recommended.

### Why is "Motors spin while armed" preferred?

We think it's essential that it's obvious when an aircraft is armed, so that passers-by don't attempt to handle it and it's clear it needs to be disarmed before it is approached.  Spin while armed is the best way to attain this-- it makes it obvious that if the throttle is bumped, those propellers will spin fast and the vehicle will fly.

Otherwise, it becomes possible to land and fail to disarm, and you're just a small mistake away from severe injury.

### How can I get additional help?

First, please read http://xyproblem.info before contacting support.  Keep in mind that dRonin is a non-profit project and all support is provided by volunteers, so please be patient.

* dRonin Forum:  https://forum.dronin.org/
* dRonin IRC (live chat): #dRonin on irc.freenode.net; can be accessed in a web browser here: https://kiwiirc.com/client/irc.kiwiirc.com/dronin/