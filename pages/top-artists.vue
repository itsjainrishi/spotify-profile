<template>
  <section class="main">
    <TopHeader :selectedTab="artists">Top Artists</TopHeader>
    <div class="top__artists__container columns is-mobile">
      <div
        v-for="artist in activeArtists"
        class="top__artists__artist column is-half-touch is-one-quarter-desktop"
      >
        <a
          :href="artist.external_urls.spotify"
          class="top__artists__artistartwork"
        >
          <img :src="artist.images[0].url" />
        </a>
        <a class="top__artists__artistname">{{ artist.name }}</a>
      </div>
    </div>
  </section>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
import axios from '~/plugins/axios'

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
  components: { TopHeader },
  computed: {
    artists() {
      return 'artists'
    },
    activeArtists() {
      return this.$store.state.activeArtistsRange
    }
  },
  middleware: 'auth',
  async asyncData() {
    const {
      data: { short, medium, long }
    } = await axios.get('/top-artists')
    return { long: long.items, medium: medium.items, short: short.items }
  },
  mounted() {
    this.$store.dispatch('setLong', { prop: 'artists', data: this.long })
    this.$store.dispatch('setMedium', { prop: 'artists', data: this.medium })
    this.$store.dispatch('setShort', { prop: 'artists', data: this.short })
    this.$store.dispatch('updateActiveArtistsRange', 'long')
  }
}
</script>

<style lang="scss">
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
.top__artists__container {
  margin-top: 50px;
  margin-left: 0;
  margin-right: 0;
  flex-wrap: wrap;
}
.top__artists__artist {
  text-align: center;
  max-width: 50%;
}
.top__artists__artistartwork {
  display: inline-block;
  height: 200px;
  width: 200px;
  position: relative;

  img {
    border-radius: 100%;
    height: 200px;
    width: 200px;
  }
}
.top__artists__artistname {
  margin: 20px 0;
  color: white;
  display: block;

  &:hover {
    color: white;
  }
}
@media (min-width: 1400px) {
  .top__artists__artist {
    max-width: 20%;
  }
}
@media (max-width: 1399px) {
  .top__artists__artist {
    max-width: 25%;
  }
}
@media (max-width: 1200px) {
  .main {
    padding: 70px 50px;
  }
}
@media (max-width: 1100px) {
  .top__artists__artist {
    max-width: 33.3%;
  }
}
@media (max-width: 900px) {
  .top__artists__artist {
    max-width: 50%;
  }
}
@media (max-width: 768px) {
  .main {
    padding: 60px 40px;
  }
  .top__artists__artist {
    max-width: 33.3%;
  }
  .top__artists__artistartwork {
    height: 150px;
    width: 150px;
    img {
      height: 150px;
      width: 150px;
    }
  }
}
@media (max-width: 600px) {
  .top__artists__artist {
    max-width: 50%;
  }
}
@media (max-width: 480px) {
  .main {
    padding: 40px 25px;
  }
  .top__artists__artistartwork {
    height: 120px;
    width: 120px;

    img {
      height: 120px;
      width: 120px;
    }
  }
}
@media (max-width: 400px) {
  .top__artists__artist {
    max-width: 100%;
  }
}
</style>
