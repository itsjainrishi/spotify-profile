<template>
  <div class="container">
    <aside class="menu">
      <div class="nav-spotify">
        <nuxt-link to="/auth">
          <IconSpotify />
        </nuxt-link>
      </div>
      <ul class="nav-list">
        <li>
          <nuxt-link to="/top-artists">
            <IconMicrophone />
            <div>Top Artists</div>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="/top-tracks">
            <IconMusic />
            <div>Top Tracks</div>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="/bla2">
            <IconTime />
            <div>Recent</div>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="/playlists">
            <IconPlaylist />
            <div>Playlists</div>
          </nuxt-link>
        </li>
      </ul>
      <div class="nav-github">
        <nuxt-link to="/auth">
          <IconGithub />
        </nuxt-link>
      </div>
    </aside>
  </div>
</template>

<script>
import IconSpotify from './icons/spotify'
import IconMicrophone from './icons/microphone'
import IconMusic from './icons/music'
import IconTime from './icons/time'
import IconPlaylist from './icons/playlist'
import IconGithub from './icons/github'

export default {
  components: {
    IconSpotify,
    IconMicrophone,
    IconMusic,
    IconTime,
    IconPlaylist,
    IconGithub
  },
  computed: {
    isAuth() {
      return this.$route.name === 'auth'
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.nav-spotify {
  height: 70px;
  width: 70px;
  margin: 0 auto;

  a {
    display: block;
    height: 50px;
    width: 50px;
    margin: auto;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  svg {
    fill: rgb(30, 215, 96);
  }
}
.nav-list {
  font-family: 'Kulim Park', sans-serif;
  font-size: 11px;
  display: flex;

  li {
    text-align: center;
  }

  a {
    padding: 15px 0;
    color: rgb(155, 155, 155);
    height: 70px !important;
    display: block;

    &.nuxt-link-active,
    &:hover {
      color: rgb(255, 255, 255);
      background-color: rgb(24, 24, 24);

      svg {
        fill: rgb(255, 255, 255);
      }
    }
  }

  svg {
    fill: rgb(155, 155, 155);
    width: 20px;
    height: 20px;
  }
}
.nav-github {
  fill: rgb(155, 155, 155);
  width: 45px;
  height: 45px;
  margin: 0 auto;

  svg {
    width: 30px;
    height: 30px;
  }

  a:hover {
    background-color: transparent;
    svg {
      fill: rgb(80, 155, 245);
    }
  }
}

@media (max-width: 768px) {
  #navbar {
    top: auto;
    bottom: 0;
    width: 100%;
    min-height: 70px;
    height: 70px;
    display: flex;
    flex-direction: row;
    padding: 0;
  }

  .nav-spotify {
    display: none;
  }
  .nav-github {
    display: none;
  }
  .nav-list {
    li {
      flex-basis: 100%;
      flex-grow: 1;
    }
    a {
      border-top: 3px solid transparent;
    }
    a:hover,
    a.nuxt-link-active {
      border-top: 3px solid rgb(30, 215, 96);
    }
  }
}

@media (min-width: 769px) {
  .nav-list {
    flex-direction: column;
    a {
      border-left: 5px solid transparent;
    }

    a:hover,
    a.nuxt-link-active {
      border-left: 5px solid rgb(30, 215, 96);
    }
  }
}
</style>
