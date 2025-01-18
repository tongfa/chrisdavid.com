On October 12, 2007 I officially contributed to the linux kernel!
[My commmit](https://github.com/torvalds/linux/commit/a202707e71ff16d5e3a92f40eeaa41f3099dd8c5) is even in the log.

I discovered an i2c bus issue on a demo board featuring the [Alchemy](https://en.wikipedia.org/wiki/Alchemy_(processor)) Au1550 processor. What's
an Au1550 processor you might ask? It's a relatively obscure CPU used in embedded
systems applications. The application I worked on was a Rodgers Masterpeice Classical Pipe organ. Early on in the project I had the role of vetting the
very first motherboards manufactured for the organs with this chip on them, to see which
ones worked, which ones were fixable, and which were bricked, or as the Japanese say, worthy of becoming a buddha statue. Initially this
issue escaped me, but eventually our software started sending more data on
the i2c bus. At some point we experienced intermittent but frequent hangs (system completely unresponsive, think "blue screen of death", but without the screen.) My job was to dig in and figure out the problem, and to my surpise it wasn't the software we were writing, it was the driver that was part of the linux kernel itself. Once I determined the problem and had a fix, I was very excited and proud to submit it to the linux kernel team. This certainly was a personal highlight in my career.

If you didn't ask about the CPU, perhaps you are wondering what is an i2c bus? It's a simple two wire bus, kind of like USB, but it's not designed to be plugged / unplugged like USB. And it does not provide power either. It's a way for various computer hardware components to communicate, such as sensors and data storage. It's more finicky than USB, and for that reason in my humble opinion, it's best if the i2c bus is limited to just a single PCB board. If it spans two PC boards, then the slighlest jiggle of a wire in an inopportune moment can cause the driver to hang, which I've also seen hang the entire kernel. And the only recovery for that is to power everything down, then start again.

![A penguin walking towards with one eye facing the viewer](images/AI_penguin.jpg)