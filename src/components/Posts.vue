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
          title: 'Avantone C12 mic',
          date: '2021 Dec 11',
          text: `
I don't have one of these, but a friend of mine does and I was curious enough to do some reasearch on it.

## description

This mic is a clone of a much more expensive mic, an AKG C12.

It's a tube mic, where the tube is situated inside the microphone body itself.  This design is relevant because it's proven to produce excellent results.
An audio engineer once mentioned to me that a research study was done on what is considered to be the best vocal performances on popular
songs recorded in the 1950's - 1970's range, the purpose being to discover commonalities in these recordings.  It was revealed that all the
recordings used tube mics, without exception.  I don't know if C12's were used
in this recordings, since I never actually saw the study.

The tube does many things, among them you can push the mic harder and it won’t clip “in a bad way”, the tube circuitry acts like a compressor in this regard.
When a tube clips it does so progressively instead of just cutting out at a signal limit (like solid state and digital) and it adds a pleasing tone to the sound.
“warms it up”.

## an easy modification

Here’s a guy who’s selling an upgraded version of this mic that sounds like its close to the AKG C12 in performance:
https://reverb.com/item/18495284-heavily-modified-one-of-a-kind-avantone-cv-12-condesner-microphone-mic-akg-c12-vr-clone
If anyone were going to do a single mod, I would recommend to replace the tube.  Should be plug and play.
The stock tube is quite clean sounding according to this URL, Avantone used to ship it with two other “grittier” tubes, according to this URL:
http://recordinghacks.com/microphones/Avant/CV-12

But the first article mentions this which is more interesting than those grittier tubes:

> The tube has been recently upgraded from a decent enough Russian TO-SOL 12ax7 tube to a NOS vintage 1957 GE 6072a hand selected by the one and only Christian Whitmore of gearslutz for the tune of about $150, a no joke mic grade gem that sounds nothing like the other GE 6072's I have. The tube tests like new on my tube tester in every categaory.

## recording considerations

When recording you will want to consider how much of the tube warmth you want in the sound.  With the stock tube, I’m guessing you’d have to drive the mic pretty hard (basically a very loud source) to get tube warmth.
If recording an acoustic guitar, or voice, there are practical limits in volume.

Another options is to replace the tubes with something that starts clipping at lower signal levels.  That’s what the ECC81 & ECC83 tubes would do.

Just in case you are doubting what changing tubes might do, I once was demonstrating a 1970's Fender Rhodes to a 70 year old grandma, and mentioned
to her it sounds even better if I switch out the tubes in the amp.  She thought there's no way she'd hear the difference.  So I said lets try it.  She was
shocked that she could hear such a big difference.  I believe that was a modern Russian tube versus a NOS tube.

If this was my only mic for recording, I would probably use a different tube for each track, especially if recording the same instrument on multiple tracks.
Variation like that always helps recordings, the human ear picks up patterns we are not aware of, and when it picks up on repetition it
sends our brains a “this is less interesting” message.  Even without a NOS tube, getting a few cheaper tube variations
would give some options when recording.  I would also recommend changing the mic pattern for variation.
          `,
        },
        {
          title: 'Recording - Setting gain levels',
          date: '2021 Dec 11',
          text: `
There is one thing I wish I had known sooner in my ametuer recording projects.  It goes something like this:

When setting gain levels, you want to maximize headroom.
Don’t make the mistake of thinking “not using all the ADC bits” gives you less fidelity (frequency range).
It’s the sampling rate that gives you fidelity, not the number of bits used in a given sample itself.  (number of bits used in a sample is akin to dynamic range.)

Set your gain levels sufficiently that they are high enough above the noise floor that the noise floor isn’t making things worse.
Whatever is left over becomes headroom, and it’s that headroom that’s going to prevent hard clipping should your input signal get unexpectedly loud.
You can’t fix hard clipping except by replacing the recording.

Getting rid of noise is even harder, so the balance is important to get right and you should take some time practicing and playing with this.

Don't worry about some noise in your signal.  Its worth noting that some audio hardware / software purposely injects noise into the signal to
“fix” undesirable artifacts of the hardware.  This is a form of dithering.  The problem it fixes is when the sound pressure level recorced by the hardware
is a bit off from the ideal.  For example maybe when the hardware outputs a 50 it's accurate.  But when it outputs 51 it's off of the ideal value
by 10%.
Adding a low level of random noise into the signal causes those
non-ideal level differences to be averaged out masking the artifact of the root problem from the ear.

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
