<template>
  <div :class="['columns is-multiline', 'base', { auth: rootClass }]">
    <Header :isAuth="isAuth" class="column is-12" />
    <section
      class="content column is-half-desktop is-offset-one-quarter-desktop"
    >
      <nuxt />
    </section>
    <Footer />
    <nuxt-link
      v-if="isAuth"
      class="area-close"
      aria-hidden="true"
      to="/"
      name="index"
    >
    </nuxt-link>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Header, Footer },
  titleShort: 'is Listening',
  authorName: 'Rishi',
  computed: {
    isAuth() {
      return this.$route.name === 'auth'
    },
    rootClass() {
      return this.isAuth
    }
  },
  head() {
    return {
      title: `${this.$options.authorName} ${this.$options.titleShort} ·X· A Musical App`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
        }
      ]
    }
  }
}
</script>

<style>
:root {
  --colorGray: #333642;
  --colorGreen: rgb(28, 185, 84);
}
html {
  background: #000000;
}
body {
  color: white;
  font-family: 'Bungee Hairline', monospace;
}
.base {
  margin: 0;
  background-size: cover;
  background-image: linear-gradient(to top, var(--colorGray), #000000);
  height: 100vh;
  overflow-x: hidden;
}
a {
  color: white;
  text-decoration: none;
  display: inline-block;
  position: relative;
  font-weight: 600;
}
a:not(.area-close):after,
a:not(.area-close):before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1em;
  z-index: -1;
  mix-blend-mode: color-burn;
}
a:after {
  bottom: 2px;
  background: var(--colorGreen);
  z-index: -1;
  transform: rotate(-3deg);
}
.auth header,
.auth footer {
  filter: blur(20px);
}
.auth .content {
  transform: translateY(0) !important;
}
.nuxt-progress {
  opacity: 0.3;
  height: 2px;
  bottom: 0;
  top: auto;
}

a.area-close {
  display: block;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 0;
  cursor: default;
}

@media (max-width: 900px) {
  h1 {
    font-size: 12em !important;
  }
}
@media (max-width: 800px) {
  h1 {
    font-size: 10em !important;
  }
}
@media (max-width: 600px) {
  h1 {
    font-size: 8em !important;
  }
  h2 {
    font-size: 2em !important;
    line-height: 1.2em;
  }
}
@media (max-width: 500px) {
  h1 {
    font-size: 5em !important;
  }
}
</style>
