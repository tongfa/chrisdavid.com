<template>
  <div class="markdown" v-html="rawHtml()"></div>
</template>

<script>
import Markdown from 'pagedown';
const converter = new Markdown.Converter();

export default {
  name: 'markdown',
  methods: {
    rawHtml() {
      return converter.makeHtml(`
Logged: *${this.article.date}*

# ${this.article.title}

${this.article.text}
`)
    }
  },
  props: ['article']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  text-align: center;
}

a {
  color: rgb(62, 144, 199);
}

blockquote {
  border-left: thick solid rgb(55, 143, 202);
  padding-left: 10px;
  font-style: italic;
}

</style>
