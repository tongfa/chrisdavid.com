<template>
  <div class="main-logo">
    <img alt="Trimax logo" src="./assets/logo.png">
  </div>
  <Home/>
  <Services/>
  <Contact/>
</template>

<script>
import Home from './components/Home.vue'
import Services from './components/Services.vue'
import Contact from './components/Contact.vue'

export default {
  name: 'App',
  components: {
    Home,
    Services,
    Contact,
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
  color: #CCB;
  background-color: #000;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
}


#app .main-logo {
  display: flex;
  justify-content: center;
}

#app .main-logo img {
  width: 400px;
}

@media screen and (max-width: 991px) {
  #app .main-logo img {
    width: 40vw;
  }
}

@media screen and (max-width: 667px) {
  html {
    font-size: 0.75rem;
  }
}

html {
  background-color: #999;
  display: flex;
  justify-content: center;
}

body {
  max-width: 1024px;
  margin: 0;
  flex: 1 0;
}
</style>
