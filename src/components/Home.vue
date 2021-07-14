<template>
  <div class="home">
    <h2>Father, Musician, Camper, Bicycler, Traveller, Maker</h2>
    <div class="social-list">
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
</template>

<script>
export default {
  name: 'Home',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin: 0 10px;
  text-align: center;
}

.social-list {
  padding-top: 20px;
}

.social-list > a {
  padding: 9px;
}
</style>
