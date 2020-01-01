<template>
  <header>
    <h1>
      {{ $nuxt.layout && $nuxt.layout.authorName }}
      {{ $nuxt.layout && $nuxt.layout.titleShort }}
      <nuxt-link
        :aria-current="isAuth"
        to="/auth"
        name="auth"
        aria-label="Login"
      />
    </h1>
  </header>
</template>

<script>
export default {
  props: {
    isAuth: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
h1 {
  line-height: 0.65em;
  font-family: 'Oswald', monospace;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 15em;
  transform: rotate(-3deg) translateY(-50%);
  -webkit-box-reflect: below 0px
    linear-gradient(transparent, rgba(255, 255, 255, 0.3));
  margin: 0.67em 0;
}
h1 a {
  display: inline-block;
  height: 21px;
  width: 21px;
  background-image: url(~assets/spotify.svg);
  background-size: cover;
  filter: opacity(60%);
  position: absolute;
  bottom: 0;
}
h1 a:hover {
  filter: brightness(300%) opacity(60%);
}
h1 a:after,
h1 a:before {
  content: none;
}
header {
  filter: blur(0);
  transition: all 600ms ease-out;
}
p {
  width: 40%;
  margin: auto;
  min-width: 320px;
}
</style>
