<template>
  <section class="main">
    <header class="top__header">
      <h2>
        Playlists
      </h2>
    </header>
    <div class="playlists__container columns is-mobile">
      <div
        v-for="playlist in playlists"
        class="playlists__playlist column is-half-touch is-one-quarter-desktop"
      >
        <nuxt-link
          :to="`/playlists/${playlist.id}`"
          class="playlists__playlistcover"
        >
          <img
            :src="playlist.images[0].url"
            class="playlists__playlistimage"
            alt="Playlist Art"
          />
        </nuxt-link>
        <div class="playlists__playlistmeta">
          <a class="playlists__playlistname">
            {{ playlist.name }}
          </a>
          <div class="playlists__totaltracks">
            {{ playlist.tracks.total }} Tracks
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'profile',
  middleware: 'auth',
  async asyncData() {
    const {
      data: { item: playlists }
    } = await axios.get(`
      ${process.env.CLIENT_URL}/api/spotify/playlists`)
    return { playlists }
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
.playlists__container {
  margin-top: 50px;
  margin-left: 0;
  margin-right: 0;
  flex-wrap: wrap;
  list-style: none;
}
.playlists__playlistcover {
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  position: relative;
}
.playlists__playlistmeta {
  text-align: center;
}
.playlists__playlistname {
  display: inline;
  border-bottom: 1px solid transparent;

  &:hover,
  &:focus {
    border-bottom: 1px solid rgb(255, 255, 255);
  }
}
.playlists__totaltracks {
  text-transform: uppercase;
  margin: 5px 0px;
  color: rgb(155, 155, 155);
  font-size: 12px;
  letter-spacing: 1px;
}
@media (min-width: 1400px) {
  .playlists__playlist {
    max-width: 20%;
  }
}
@media (max-width: 1399px) {
  .playlists__playlist {
    max-width: 25%;
  }
}
@media (max-width: 1200px) {
  .main {
    padding: 70px 50px;
  }
}
@media (max-width: 1100px) {
  .playlists__playlist {
    max-width: 33.3%;
  }
}
@media (max-width: 900px) {
  .playlists__playlist {
    max-width: 50%;
  }
}
@media (max-width: 768px) {
  .main {
    padding: 60px 40px;
  }
  h2 {
    text-align: center;
  }
  .playlists__playlist {
    max-width: 33.3%;
  }
}
@media (max-width: 600px) {
  .playlists__playlist {
    max-width: 50%;
  }
}
@media (max-width: 480px) {
  .main {
    padding: 40px 25px;
  }
}
</style>
