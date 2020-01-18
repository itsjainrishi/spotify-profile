<template>
  <section class="main">
    <TopHeader>Top Tracks</TopHeader>
    <ul class="top__tracks__container">
      <Track v-for="track in activeTracks" :track="track" />
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import TopHeader from '~/components/TopHeader.vue'
import Track from '~/components/Track.vue'

export default {
  layout: 'profile',
  key: (to) => to.fullPath,
  // Called to know which transition to apply
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  middleware: 'auth',
  components: { TopHeader, Track },
  computed: {
    activeTracks() {
      return this.$store.state.activeTracksRange
    }
  },
  async asyncData() {
    const {
      data: { short, medium, long }
    } = await axios.get(`
      ${process.env.CLIENT_URL}/api/spotify/top-tracks`)
    return { long: long.items, medium: medium.items, short: short.items }
  },
  mounted() {
    this.$store.dispatch('setLong', { prop: 'tracks', data: this.long })
    this.$store.dispatch('setMedium', { prop: 'tracks', data: this.medium })
    this.$store.dispatch('setShort', { prop: 'tracks', data: this.short })
    this.$store.dispatch('updateActiveTracksRange', 'long')
  }
}
</script>

<style lang="scss" scoped>
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
.content ul {
  margin-top: 50px;
  margin-left: 0;
  margin-right: 0;
  flex-wrap: wrap;
  list-style: none;
}
@media (max-width: 1200px) {
  .main {
    padding: 70px 50px;
  }
}
@media (max-width: 768px) {
  .main {
    padding: 60px 40px;
  }
}
@media (max-width: 480px) {
  .main {
    padding: 40px 25px;
  }
}
</style>
