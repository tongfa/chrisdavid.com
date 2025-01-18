<script>
  // ... any layout logic
</script>

<header>
    <img alt="mountain panorama" src="mountain.jpg">
</header>

<slot />

<footer>
    <a href="https://www.facebook.com/ivorysharps" target="_blank">
        <img alt="facebook icon" src="/social/fb-icon.svg">
    </a>
    <a href="https://www.linkedin.com/in/ivorysharps" target="_blank">
        <img alt="facebook icon" src="/social/linkedin-icon.svg">
    </a>
    <a href="https://github.com/tongfa" target="_blank">
        <img alt="facebook icon" src="/social/github-icon.svg">
    </a>
</footer>

<style>
    header > img {
        max-width: 100vw;
    }

    footer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @import url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&family=Source+Code+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    :global(body) {
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
    }

    @media screen and (max-width: 991px) {

    }

    @media screen and (max-width: 667px) {
      :global(html) {
        font-size: 0.75rem;
      }
    }

    :global(html) {
      display: flex;
      justify-content: center;
     -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    :globa(html)::-webkit-scrollbar {
      display: none;
    }

    :global(body) {
        font-family: 'Source Code Pro', monospace;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: rgb(0, 0, 0);
      background-color: rgb(240, 240, 255);
      margin: 0;
      flex: 1 0;
    }

</style>