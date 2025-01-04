<template>
  <div>
    <h4>recent posts</h4>
    <div
      class="post-link"
      v-for="p in posts" v-bind:key="p.title"
      @click="selectedPostIndex = posts.indexOf(p); $modal.show('post-modal')"
      >
      <span>
        {{ p.date }} - {{ p.title }}
      </span>
    </div>

    <modal name="post-modal">
      <div v-if="selectedPostIndex !== null">
          <Markdown :article="posts[selectedPostIndex]" />
      </div>
    </modal>
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
          title: 'Skiing - fearless and one with the mountain',
          date: '2024 Dec 26',
          text: 'will I see this?',
          media: 'Skiing Dec 26 2024.mp4'
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
