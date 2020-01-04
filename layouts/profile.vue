<template>
  <div class="columns is-multiline base-profile">
    <section id="navbar" class="column is-2">
      <Sidenav />
    </section>
    <section class="content column">
      <nuxt />
    </section>
  </div>
</template>

<script>
import Sidenav from '~/components/Sidenav.vue'

export default {
  components: { Sidenav },
  titleShort: 'is Listening',
  authorName: 'Ram',
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
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Kulim+Park&display=swap'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --colorGray: #333642;
  --colorGreen: rgb(28, 185, 84);
}
body {
  color: white;
}
.base-profile {
  margin: 0;
  background: #181818;
  height: 100vh;
  overflow-x: hidden;
  font-family: 'Kulim Park', sans-serif;

  a {
    color: white;
    text-decoration: none;
    display: block;
    position: relative;
    font-weight: 600;
    text-align: center;
  }
  a:after {
    background: none;
  }
}
#navbar {
  background-color: #000000;
  bottom: 0;
  opacity: 0.99;
  padding: 1.5rem 0;
  top: 0;
  position: fixed;
  width: 100% !important;
  z-index: 99;
}
@media (max-width: 768px) {
  #navbar {
    top: auto;
    min-height: 70px;
    height: 70px;
    display: flex;
    flex-direction: row;
    padding: 0;
    position: fixed;
  }
  .content {
    padding: 0;
  }
}
@media (min-width: 769px) {
  #navbar {
    max-width: 100px !important;
  }
}
</style>
