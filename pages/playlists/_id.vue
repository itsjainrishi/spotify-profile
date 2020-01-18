<template>
  <transition name="fade">
    <section class="main">
      <div class="playlist__playlistcontainer columns">
        <div class="playlist__left column">
          <div class="playlist__cover">
            <img :src="playlist.images[0].url" alt="Playlist Art" />
          </div>
          <a :href="playlist.external_urls.spotify">
            <h3 class="playlist__name">
              {{ playlist.name }}
            </h3>
          </a>
          <p class="playlist__owner">By {{ playlist.owner.display_name }}</p>
          <p class="playlist__totaltracks">
            {{ playlist.tracks.total }} Tracks
          </p>
        </div>
        <div class="playlist__right column">
          <ul>
            <Track v-for="item in playlistTracks" :track="item.track" />
          </ul>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import Track from '~/components/Track.vue'

export default {
  layout: 'profile',
  middleware: 'auth',
  components: { Track },
  computed: {
    playlistTracks() {
      return this.playlist.tracks.items
    }
  },
  async asyncData(context) {
    const {
      data: { item: playlist }
    } = await context.$axios.get(`/playlist/${context.params.id}`)
    return { playlist }
  }
}
</script>

<style lang="scss" scoped>
main {
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
  margin-left: 0;
  margin-top: 0;
  flex-wrap: wrap;
  list-style: none;
}
.playlist__playlistcontainer {
  flex-wrap: wrap;
  list-style: none;
}
.playlist__left {
  max-width: 30%;
  text-align: center;
  min-width: 200px;
}
.playlist__cover {
  width: 100%;
  max-width: 300px;
  margin: 0px auto;

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
}
h3 {
  color: rgb(255, 255, 255);
  margin-top: 20px;
}
.playlist__owner {
  color: rgb(155, 155, 155);
  font-size: 14px;
}
.playlist__totaltracks {
  font-size: 14px;
}
.playlist__right {
  margin-left: 50px;
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
  .playlist__left {
    max-width: 100%;
    text-align: center;
    min-width: 200px;
  }
}
@media (max-width: 480px) {
  .main {
    padding: 40px 25px;
  }
}
</style>
