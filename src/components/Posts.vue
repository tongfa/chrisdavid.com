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
          title: 'Avantone CV12 microphone',
          date: '2021 Dec 11',
          text: `
I don't have one of these, but a friend of mine does and I was curious enough to research it.

## description

This mic is a clone of a much more expensive mic, an AKG C12.

It's a tube mic, where the tube is situated inside the microphone body itself.  This design is known to produce excellent results.
An audio engineer once mentioned to me that a study was done on what is considered to be the best vocal performances on popular
songs recorded let's say pre 1960, the purpose being to discover commonalities in these recordings.  It was revealed that all the
recordings used tube mics, without exception.  I don't know if C12's were used
in this recordings, since I never actually saw the study.

One nice thing about tubes is that you can push the signal harder (i.e. run amplification closer to limits) and it won’t clip “in a bad way”.
Tube circuitry naturally acts like a compressor in this regard.
When a tube is at its amplification limit it reduces the signal progressively maintaining its integrity, even adding a pleasing tone to the sound.
Other amp designs "hard clip" which means at the limit they are stuck at that limit and the input signal is effectively lost.  Solid state and
digital amps do this without extra circuitry or DSP to prevent it.  And when hard clipping happens its as pleasing as finger nails on a chalkboard.

## an easy modification

If anyone were going to do a single mod, I would recommend to replace the tube.  Should be plug and play.
The stock tube is quite clean sounding according to this URL, Avantone used to ship it with two other “grittier” tubes, according to this URL:
http://recordinghacks.com/microphones/Avant/CV-12

But this article which mentions several possible modifications references another interesting tube option:
https://reverb.com/item/18495284-heavily-modified-one-of-a-kind-avantone-cv-12-condesner-microphone-mic-akg-c12-vr-clone

> The tube has been recently upgraded from a decent enough Russian TO-SOL 12ax7 tube to a NOS vintage 1957 GE 6072a hand selected by the one and only Christian Whitmore of gearslutz for the tune of about $150, a no joke mic grade gem that sounds nothing like the other GE 6072's I have. The tube tests like new on my tube tester in every categaory.

Who knows - maybe you can still get one those tubes?

Just in case you are doubting what changing tubes might do, I once was demonstrating a 1970's Fender Rhodes to a 70 year old grandma, and mentioned
to her it sounds even better if I switch out the tubes in the amp.  She thought there's no way she'd hear the difference.  So I said lets try it.  She was
shocked that she could hear such a big difference.  I believe that was a modern Russian tube versus a NOS tube.

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
There is one thing I wish I had known sooner in my ametuer recording projects that would have helped me prevent clipping.  It goes something like this:

When setting gain levels, you want sufficient headroom.
Don’t make the mistake of thinking “not using all the ADC bits” gives you less fidelity (frequency range).
It’s the sampling rate that gives you fidelity, not the number of bits used in a given sample itself.  (number of bits used in a sample is akin to dynamic range.)

You also want your gain level sufficiently above the noise floor.  50db over the noise floor would be great in a recording studio.
But for lesser professional projects, it's worthwhile to keep in mind that if your signal to noise ratio is too low, you'll still hear the performance
in the recording just fine.  The noise will generally be a minor annoyance and make the recording sound less professional, but that's it.
But if you fall short on headroom, then you clip, and when you
clip you are no longer recording the input signal.  And your recording is pretty much trash and can't be fixed.

One musician I knew who attended Berkelee School of Music recommended setting the gain levels for live recording so that during a sound check
you are seeing the sound level meters just starting to move, but then stop adding gain at that point.  Then listen to it to double check the noise floor.
If there's no
problem then leave it.  Don't add gain without a noise floor problem thinking you'll get a better recording.

A low noise floor is OK.  Its worth noting that some audio hardware / software purposely injects noise into the signal to
“fix” undesirable artifacts of the hardware.  This is a form of dithering.  The problem it fixes is when the sound pressure level recorced by the hardware
is a bit off from the ideal.  For example maybe when the hardware outputs a 50 it's accurate.  But when it outputs 51 it's off of the ideal value
by 10%.  Adding a low level of random noise into the signal causes those
non-ideal level differences to be averaged out masking the artifact of the root problem from the ear.
This is a case where having noise is actually beneficial.

The point is, an audible but low noise floor is OK, so don’t eat into your headroom to push the noise floor way, way down.
Generally you want your loudest signal to be in the -3 or -6 db range.  And if that means your normal signal is around -10 or -20, that’s ok.
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
