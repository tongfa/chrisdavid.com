<template>
  <Home/>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home,
  },
}

/*
 * breakpoints 688 / 992 / 1312
 *
 */
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&family=Source+Code+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap');
#app {
  font-family: 'Source Code Pro', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
}

@media screen and (max-width: 991px) {

}

@media screen and (max-width: 667px) {
  html {
    font-size: 0.75rem;
  }
}

html {
  display: flex;
  justify-content: center;
 -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

html::-webkit-scrollbar {
  display: none;
}

body {
  margin: 0;
  flex: 1 0;
}


</style>
