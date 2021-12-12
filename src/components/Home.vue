<template>
  <div>
    <div id="header-image" class="main-logo">
      <img
        alt="mountain panorama picture"
        src="../assets/panorama2.jpg"
        :style="imageStyle"
        >
    </div>
    <div
      id="header-message"
      :style="headerStyle"
      >
      <h2>Father, Musician, Camper, Bicycler, Traveller, Maker</h2>
    </div>
    <div
      class="content"
      :style="contentStyle"
      >
      <Posts/>
    </div>
    <div>
      <div id="social-list">
          <a href="https://www.facebook.com/ivorysharps" target="_blank">
            <img alt="facebook icon" src="../assets/fb-icon.svg" style="background-color:#FFF;">
          </a>
          <a href="https://www.linkedin.com/in/ivorysharps" target="_blank">
            <img alt="facebook icon" src="../assets/linkedin-icon.svg">
          </a>
          <a href="https://github.com/tongfa" target="_blank">
            <img alt="facebook icon" src="../assets/github-icon.svg">
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from './Posts.vue'

export default {
  name: 'Home',
  components: {
    Posts,
  },
  data: function() {
    return {
      selectedPage: 'home',
      imagePos: 0,
      stick: false,
      messageHeight: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    imageStyle() {
      return {
        top: `${this.imagePos}px`,
      }
    },
    headerStyle() {
      return {
        position: this.stick ? 'fixed' : 'static',
        top: '0px',
      }
    },
    contentStyle() {
      return {
        'padding-top': this.stick ? `${this.messageHeight}px` : '0px',
      }
    },
  },
  methods: {
    handleScroll() {
      const headerImage = document.getElementById('header-image');
      if (! headerImage) { return; }
      const headerMessage = document.getElementById('header-message');
      if (! headerMessage) { return; }

      const imageHeight = headerImage.clientHeight;

      this.messageHeight = headerMessage.clientHeight;
      this.imagePos = window.scrollY;
      this.stick = this.imagePos > imageHeight;

      //console.log(this.messageHeight, this.imagePos, this.stick);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app .main-logo {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

#app .main-logo img {
  max-width: 100vw;
  position: relative;
}

#header-message {
  background-color: rgb(255, 255, 255);
  height: 70px;
}

#header-message h2 {
  width: 100vw;
  font-family: 'Fuzzy Bubbles', cursive;
  text-align: center;
}

.content {
  overflow: hidden;
  margin: 0 10px;
  padding-bottom: 45px;
}

#social-list {
  padding-top: 5px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #FFF;
  height: 52px;
}

#social-list > a {
  padding: 9px;
}
</style>
