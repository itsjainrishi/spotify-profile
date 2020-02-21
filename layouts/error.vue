<template>
  <div class="main">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Go to Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  layout: 'profile' // you can set a custom layout for the error page
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 100px 80px;
  a {
    color: rgb(255, 255, 255);
  }
}
</style>
