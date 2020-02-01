<template>
  <li class="tracks__trackitem">
    <a
      :href="track.external_urls.spotify"
      class="trackitem__trackcontainer columns is-mobile"
    >
      <div class="column is-1-desktop is-3-mobile is-2-tablet">
        <div class="trackitem__artowrk">
          <img :src="track.album.images[0].url" alt="Track Art" />
        </div>
      </div>
      <div class="trackitem__trackmeta column">
        <div class="columns is-mobile">
          <span class="trackitem__trackleft column">
            <span class="trackitem__trackname">{{ track.name }}</span>
            <div class="trackitem__album">
              <span v-for="artist in track.artists">
                {{ artist.name }}
              </span>
              &middot; {{ track.album.name }}
            </div>
          </span>
          <span
            class="trackitem__trackright column is-1-desktop is-3-mobile is-2-tablet"
          >
            <span class="trackitem__trackduration">
              {{ trackTime }}
            </span>
          </span>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['track'],
  computed: {
    trackTime() {
      const minutes = Math.floor(this.track.duration_ms / 60000)
      const seconds = ((this.track.duration_ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: rgb(255, 255, 255);
}
.trackitem__trackcontainer {
  align-items: center;
  margin-bottom: 20px;

  div.column.is-3-mobile.is-1-desktop {
    padding: 0;
  }
}
.column.is-3-mobile {
  max-width: 70px;
}
.column.is-1-desktop {
  width: 9.5%;
  min-width: 50px;
}
.trackitem__artowrk {
  display: inline-block;
  position: relative;
  height: 50px;
  width: 50px;
  margin-right: 20px;
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
}
.trackitem__trackleft {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.trackitem__trackname {
  color: rgb(255, 255, 255);
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;

  &:hover,
  &:focus {
    border-bottom: 1px solid rgb(255, 255, 255);
  }
}
.trackitem__album {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: rgb(155, 155, 155);
  margin-top: 3px;
  max-width: 650px;

  span:nth-of-type(n):not(:last-child) {
    &::after {
      content: '\002C';
    }
  }
}
.trackitem__trackduration {
  color: rgb(155, 155, 155);
  font-size: 14px;
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
  .trackitem__trackmeta {
    max-width: 75%;
  }
}
</style>
