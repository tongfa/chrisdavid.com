<template>
  <div>
    <div class="main-logo">
      <img alt="mountain panorama picture" src="./assets/panorama.png">
    </div>
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home,
  }
}

/*
 * breakpoints 688 / 992 / 1312
 *
 */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
}


#app .main-logo {
  display: flex;
  justify-content: center;
}

#app .main-logo img {
  max-width: 1024px;
}

@media screen and (max-width: 991px) {
  #app .main-logo img {
    width: 100vw;
  }
}

@media screen and (max-width: 667px) {
  html {
    font-size: 0.75rem;
  }
}

html {
  background-color: rgb(200, 222, 255);
  display: flex;
  justify-content: center;
}

body {
  max-width: 1024px;
  padding: 10px;
  margin: 0;
  flex: 1 0;
}
</style>
