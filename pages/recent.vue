<template>
  <section class="main">
    <header class="top__header">
      <h2>
        Recently Played Tracks
      </h2>
    </header>
    <ul class="recent__tracks__container">
      <Track v-for="item in recentTracks" :track="item.track" />
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import Track from '~/components/Track.vue'

export default {
  layout: 'profile',
  components: { Track },
  async asyncData() {
    const {
      data: { item: recentTracks }
    } = await axios.get(`
      ${process.env.CLIENT_URL}/api/spotify/recent-tracks`)
    return { recentTracks }
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
h2 {
  font-weight: 900;
  margin: 0 0 10px;
  color: rgb(255, 255, 255);
  font-size: 1.4em;
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
  h2 {
    text-align: center;
  }
}
@media (min-width: 601px) {
  .trackitem__trackmeta {
    max-width: 85%;
  }
}
@media (max-width: 600px) {
  .trackitem__trackmeta {
    max-width: 80%;
  }
}
@media (max-width: 480px) {
  .main {
    padding: 40px 25px;
  }
  .trackitem__trackmeta {
    max-width: 75%;
  }
}
</style>
