<template functional>
  <footer>
    <nuxt-link
      :aria-current="isAuth"
      to="/top-artists"
      name="topArtists"
      aria-label="Top-Artists"
      >Explore what else Rishi listens to?
    </nuxt-link>
  </footer>
</template>

<style scoped>
footer {
  width: 70%;
  min-width: 320px;
  max-width: 600px;
  margin: 0 auto;
  filter: blur(0);
  transition: all 600ms ease-out;
  padding-bottom: 1em;
  text-align: center;
}
</style>
