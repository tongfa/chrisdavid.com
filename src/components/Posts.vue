<template>
  <div>
    <h4>recent posts</h4>
    <div
      class="post-link"
      v-for="p in posts" v-bind:key="p.title"
      @click="selectedPostIndex = posts.indexOf(p)"
      >
      <span>
        {{ p.date }} - {{ p.title }}
      </span>
    </div>

    <Markdown v-if="selectedPostIndex !== null" :article="posts[selectedPostIndex]"/>
  </div>
</template>

<script>
import Markdown from './Markdown.vue'

export default {
  name: 'Posts',
  components: {
    Markdown,
  },
  data() {
    return {
      selectedPostIndex: null,
      posts: [
        {
          title: 'Introduction to Linux',
          date: '2022 Apr 10',
          text: `
Nearly all computers have either Windows or Mac OS installed on them. For the
nealy 30 years, I've been using an alternative called Linux, specifically
Debian linux. I want to share why I use it in hopes that I can persuade some
of my less techy friends to use it as well.

The reasons I use linux include: 

- It runs great on old hardware that you might otherwise be ready to toss.
- It's more secure than MacOS or Windows.
- It's great for software development.
- Zero cost - it can be downloaded and installed for absolutely no cost. Even better it doesn't subject you to ads or additional marketing. The cost is truely free.
- Intellectual Property Freedom - A linux OS typically includes the source code
used to create it. This means a couple things. First, it means how the OS is implemented is exposed for peer review, and this results in a quality robust system that has less problems. It also creates freedom of supportability, no longer does support need to come from the manufacturer of the OS, instead it can come from a community of folks who support themselves without corporate involvement.

### giving old hardware a new life

Like anything else, manufacturing computers uses resources. These include water, energy, rare earth elements, silicon, and the rest of the metal and plastic that becomes the computer. And because of the cost of all those, along with the profit the manufacturer is making, computers can become quite expensive.

The average lifespan of a computer is 3 - 5 years. This is a practical limit because the computer will become "slow". But, what changes there?

First, it's important to understand the hardware isn't degrading. Every computer is just as fast on the day it's tossed as it was on the day it was purchased. The components that might degrade on a computer including anything mechanical, such as a keyboard, mouse, cd-rom drive, magnetic hard drive. And then I've seen displays degrade over time (especially LCD based ones). And truth be told there are two electrical components that tend to degrade, capacitors, and SSD drives.

Bu most of the time, none of those things are what causes an individual to upgrade their computer and recycle or toss the old one.

Computers running Microsoft Windows or Apple's MacOS operating systems become slow because those two companies, who by the way provide the operating systems found on most new computers, don't care enough to *not* let it happen. We know both Microsoft and Apple each have an enormous amount of money. For them to buy a new computer for each employee every year or three is reasonable because it improves their bottom line because their software developers can be more productive with faster computers. As these software developers work on operating systems and they make decisions that impact performance, and the benchmark they use when making these decision is biased towards the computer they have in front of them. And this is never a computer manufactured more than 5 years ago. If they release a change to the OS that slows it down, as long as that slow down is tolerable on a machine in the 3 - 5 year old range it's considered sufficient in terms of performance, and they don't need to try any harder to make it faster. Now imagine a person who uses an 8 year old computer. This person isn't given much, if any consideration when decisions are made the degrade operating system performance.

That's how it is, and its really sad because the environmental impact of computing technology could be reduced if people could get say 10 or 15 years out of their purchases instead of 5.

Now comes into play linux. This article is being composed on a 2011 MacBook Pro running Debian Linux. It's 11 years old. The screen looks great because they always do on Apple products. The keyboard and mouse are in excellent condition. The mic and speakers are better than any I could get on a modern PC purchase. Still has the original battery which only lasts 3 hours, but it still works.

Linux runs so well on this machine I plan to use it for my main personal machine to write software, read email, surf web, check social media, do zoom and voice calls, do photo editing, word processing, taxes. I'll organize my photo library on it, perhaps my music library if I ever get around to it. And since it's a Mac, the hardware is really nice and feels good.

As long as this computer keeps running, I may not ever get rid of it. And I feel good about that because it means there's one less computer being purchased, and one less computer in a landfill for the time being.

Linux allows me to do that because it runs so efficiently on older hardware. The software developers of both the linux kernal and of the Debian operating system are careful not to do anything that would signficantly impact performance negatively. They have this on their mind as they move forward.

### security

Do you run antivirus software? Do you *not* run anti-virus software and worry that you are putting yourself at risk?

Well, linux is so secure out of the box that it is unnecessary to run anti-virus software on it. There isn't much malware in existence that targets linux in the first place. Much of the software installed on a linux system comes through official repositories which use software signing techniques making it a difficult vector for attacks. And linux is ahead in protection technology in general through technologies such as SELinux (SEcure Linux) and AppArmor, and firewalls for that matter. In fact linux is generally considered a solid option to implement a firewall, a key component in the protection of a local network.

Also running a modern linux distribution means you will be able to keep your computer up to date with patches. This means that if any vulnerability within the scope of the software that is part of your OS, you will be able to perform an upgrade to fix it with a simple click.

My 2011 MacBook Pro isn't even supported by Apple anymore, and therefore has not received any security updates from Apple in years. Running outdated software always has the risk of containing a security vulnerability that was discovered after that outdated software was created. Installing linux on my MBP means I no longer need to accept that risk. I am running up to date software free of any known vulnerabilities.

On top of all that, I can attest that a Debian default installation is very secure. Microsoft and Apple generally have to compromise between making their operating systems secure, and making them easy to use by people. Debian also makes similar compromises, but is able to err on the side of being much more secure for a couple reasons. First, Debian doesn't have a revenue stream to protect and therefore can be more idealistic in their approach. Second, their userbase genuinely wants security and to know that their data is safe. Third, their userbase is willing to take a few extra steps to open things up to be less secure should there be a reason to do so.

There are also privacy benefits to linux as well. Companies like Google, Apple and Microsoft make money by obtaining information from you and analyzing what you do. Linux doesn't have a corporate entity behind it, so there's simply no incentive for tracking your habits. Web browsers can still performing tracking if precautions are taken.

Debian has a package called "popularity contest" which will give Debian a list of packages that you use. But it's possible to shut that off by simply not installing it or disabling it. And even when it's on seems like it's a drop in the bucket compared to the amount of tracking I would expect MacOS or Windows does.

### really good OS for developing software

Linux is created by developers for developers. It's possible to get the source code of nearly any aspect of a linux system, and this allows tweaks, research, and learning at a level that is not possible on a closed proprietary OS such as MacOS or Windows.

Linux is capable of running nearly any language, most databases, most webservers and webstacks. If a program on linux starts doing nasty things that might make the system unstable, there's a better chance the developer can stop it than on a different OS such as Windows or MacOS.

And as an attestment to this Google's servers run linux. Actually 3/4 of the internet servers in the world run linux. Android is a linux variant. Supercomputers today run linux more than any other operating system. On the other end, Raspberry PI's, a small cheap coputer runs linux. It's versatility is unmatched compared to any other operating system.

### it's both kinds of free

All distributions of linux are free in the sense of free speech. What this means is that the source code of the software is freely available along with any modifications made to it. This is important because it means the community is in control of their own computing destiny instead of the corporation. It means that software developers can share their work with other software developers to collaborate and building something better than they could have individually. And it means their work is protected in the sense that it will always be publically avilable. And it means that these same software developers can share their work with you and me, and we can have it for free.

Some linux variants cost money, others do not. Sometimes the money paid to a linux OS supplier is for support, not the Operating System itself.

For desktop users there are many free variants to choose from. My personal favorite is [Debian](https://debian.org). I like Debian because it uses rolling updates, which means that once you install it, as long as you keep up with updates you'll never have to re-install it again. It will be supported with updates perpetually. The downside of Debian is that their installers don't support some hardware. And this means there may be some extra steps required after the initial installation to get all the hardware working. It may also mean you need perhpas a USB network adapter that's known to work for the installation process. 

## Summary

For me, running linux means one less computer going into a landfill. It means my awesome Mac hardware that's over a decade old can still be useful. It means I know my data is safe. It means I'm virtually untracked.

And most of all, it means to me that using a computer is fun.


## When not to use linux

One case to consider not to use linux is gaming. While the movement to run serious
games under linux is gaining momentum, many games are not available in a form
that runs directly on linux.

First, some reasons why not to use it.

- It's not for serious gamers. There are games on linux, but the premiere OS for running games is Microsoft Windows and that seems unlikely to change.
- It's not for running Adobe products. If you are a professional graphics designer who knows and loves the Adobe suite of tools, those run great on MacOS or Windows, but linux is not supported. That being said, there are equivalents of many Adobe tools available for linux. But while I love linux, if I were a working graphics professional using Adobe products, or even other products that don't run on linux I'd be choosing MacOS.
- You truly want things to "just work" and don't want to put any effort into learning.

          `,
        },
        {
          title: 'Avantone CV12 microphone',
          date: '2021 Dec 11',
          text: `
I don't have one of these, but a friend of mine does and I was curious enough to research it.

## description

This mic is a clone of a much more expensive mic, an AKG C12.

It's a tube mic, where the tube is situated inside the microphone body itself. This design is known to produce excellent results.
An audio engineer once mentioned to me that a study was done on what is considered to be the best vocal performances on popular
songs recorded let's say pre 1960, the purpose being to discover commonalities in these recordings. It was revealed that all the
recordings used tube mics, without exception. I don't know if C12's were used
in this recordings, since I never actually saw the study.

One nice thing about tubes is that you can push the signal harder (i.e. run amplification closer to limits) and it won’t clip “in a bad way”.
Tube circuitry naturally acts like a compressor in this regard.
When a tube is at its amplification limit it reduces the signal progressively maintaining its integrity, even adding a pleasing tone to the sound.
Other amp designs "hard clip" which means at the limit they are stuck at that limit and the input signal is effectively lost. Solid state and
digital amps do this without extra circuitry or DSP to prevent it. And when hard clipping happens its as pleasing as finger nails on a chalkboard.

## an easy modification

If anyone were going to do a single mod, I would recommend to replace the tube. Should be plug and play.
The stock tube is quite clean sounding according to this URL, Avantone used to ship it with two other “grittier” tubes, according to this URL:
http://recordinghacks.com/microphones/Avant/CV-12

But this article which mentions several possible modifications references another interesting tube option:
https://reverb.com/item/18495284-heavily-modified-one-of-a-kind-avantone-cv-12-condesner-microphone-mic-akg-c12-vr-clone

> The tube has been recently upgraded from a decent enough Russian TO-SOL 12ax7 tube to a NOS vintage 1957 GE 6072a hand selected by the one and only Christian Whitmore of gearslutz for the tune of about $150, a no joke mic grade gem that sounds nothing like the other GE 6072's I have. The tube tests like new on my tube tester in every categaory.

Who knows - maybe you can still get one those tubes?

Just in case you are doubting what changing tubes might do, I once was demonstrating a 1970's Fender Rhodes to a 70 year old grandma, and mentioned
to her it sounds even better if I switch out the tubes in the amp. She thought there's no way she'd hear the difference. So I said lets try it. She was
shocked that she could hear such a big difference. I believe that was a modern Russian tube versus a NOS tube.

## recording considerations

When recording you will want to consider how much of the tube warmth you want in the sound.
With the stock tube, I’m guessing you’d have to drive the mic pretty hard to get coloration from the tube.
This would be a combination of having a strong source and turning up the gain.

If you want that warmth (or want to push into distortion) but are running out of gain, the ECC81 & ECC83 tubes will help get you there.

If this was my only mic for recording, I would consider using a different tube and/or different mic patterns for each track,
especially if recording the same instrument on multiple tracks.
Variation like that IMO always helps recordings because the human ear picks up patterns we are not conciously aware of.
And when these patterns become repetitive the ears will send our brains a "this is less interesting” message.
Adding varation in different equipements settings, different rooms to record in, can go far to add variation to prevent that.
Even without a NOS tube, getting a few cheaper tube variations
would give some additional options when recording.
          `,
        },
        {
          title: 'Recording - Setting gain levels',
          date: '2021 Dec 11',
          text: `
There is one thing I wish I had known sooner in my ametuer recording projects that would have helped me prevent clipping. It goes something like this:

When setting gain levels, you want sufficient headroom.
Don’t make the mistake of thinking “not using all the ADC bits” gives you less fidelity (frequency range).
It’s the sampling rate that gives you fidelity, not the number of bits used in a given sample itself. (number of bits used in a sample is akin to dynamic range.)

You also want your gain level sufficiently above the noise floor. 50db over the noise floor would be great in a recording studio.
But for lesser professional projects, it's worthwhile to keep in mind that if your signal to noise ratio is too low, you'll still hear the performance
in the recording just fine. The noise will generally be a minor annoyance and make the recording sound less professional, but that's it.
But if you fall short on headroom, then you clip, and when you
clip you are no longer recording the input signal. And your recording is pretty much trash and can't be fixed.

One musician I knew recommended setting the gain levels for live recording so that during a sound check
you are seeing the sound level meters just starting to move, but then stop adding gain at that point. Then listen to it to double check the noise floor.
If there's no
problem then leave it. Don't add gain without a noise floor problem thinking you'll get a better recording.

A low noise floor is OK. Its worth noting that some audio hardware / software purposely injects noise into the signal to
“fix” undesirable artifacts of the hardware. This is a form of dithering. The problem it fixes is when the sound pressure level recorced by the hardware
is a bit off from the ideal. For example maybe when the hardware outputs a 50 it's accurate. But when it outputs 51 it's off of the ideal value
by 10%. Adding a low level of random noise into the signal causes those
non-ideal level differences to be averaged out masking the artifact of the root problem from the ear.
This is a case where having noise is actually beneficial.

The point is, an audible but low noise floor is OK, so don’t eat into your headroom to push the noise floor way, way down.
Generally you want your loudest signal to be in the -3 or -6 db range. And if that means your normal signal is around -10 or -20, that’s ok.
          `,
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-link {
  text-decoration: underline;
}

.post-link span:hover {
  color: rgb(43, 74, 104);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

</style>
