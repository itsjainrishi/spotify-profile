<template>
  <header class="top__header">
    <h2>
      <slot />
    </h2>
    <div class="top__ranges">
      <button
        :class="[
          'top__rangebutton long__range',
          { active__range: active.long }
        ]"
        @click="switchActiveRange"
        data-index="long"
      >
        <span>All time</span>
      </button>
      <button
        :class="[
          'top__rangebutton medium__range',
          { active__range: active.medium }
        ]"
        @click="switchActiveRange"
        data-index="medium"
      >
        <span>Last 6 months</span>
      </button>
      <button
        :class="[
          'top__rangebutton short__range',
          { active__range: active.short }
        ]"
        @click="switchActiveRange"
        data-index="short"
      >
        <span>Last 4 weeks</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    selectedTab: {
      type: String,
      default: 'tracks'
    }
  },
  data() {
    return {
      active: {
        long: true,
        medium: false,
        short: false
      }
    }
  },
  methods: {
    switchActiveRange(e) {
      const range = e.currentTarget.getAttribute('data-index')
      this.selectedTab === 'artists'
        ? this.$store.dispatch('updateActiveArtistsRange', range)
        : this.$store.dispatch('updateActiveTracksRange', range)
      for (const key in this.active) {
        this.active[key] = false
      }
      this.active[range] = true
    }
  }
}
</script>

<style lang="scss" scoped>
.top__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Kulim Park', sans-serif;
}
h2 {
  font-weight: 900;
  margin: 0px;
  color: rgb(255, 255, 255);
}
.top__rangebutton {
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  display: inline-block;
  border: none;
  cursor: pointer;
  color: rgb(155, 155, 155);
}
.active__range {
  color: rgb(255, 255, 255);
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid rgb(255, 255, 255);
    line-height: 1.5;
  }
}
button {
  font-family: 'Kulim Park', sans-serif;
  &:focus,
  &:hover {
    color: rgb(255, 255, 255);
  }
  span {
    white-space: nowrap;
  }
}
@media (max-width: 768px) {
  .top__header {
    display: block;

    h2 {
      text-align: center;
    }

    .top__ranges {
      display: flex;
      justify-content: space-around;
      margin: 30px 0 0;
    }
  }
}
</style>
