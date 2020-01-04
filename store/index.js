import axios from 'axios'

const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  isConnected: false,
  message: null,
  nowPlaying: {},
  recentlyPlayed: {},
  trackProgress: 0,
  isPlaying: false,
  longTracks: {},
  mediumTracks: {},
  shortTracks: {},
  longArtists: {},
  mediumArtists: {},
  shortArtists: {},
  activeArtistsRange: {},
  activeTracksRange: {}
})

export const mutations = {
  connectionChange(state, isConnected) {
    state.isConnected = isConnected
  },
  updateMessage(state, message) {
    state.message = message
  },
  nowPlayingChange(state, nowPlaying) {
    state.nowPlaying = nowPlaying
  },
  isPlayingChange(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  progressChange(state, { progress, duration }) {
    state.trackProgress = (progress / duration) * 100
  },
  recentlyPlayedChange(state, recentlyPlayed) {
    state.recentlyPlayed = recentlyPlayed
  },
  setLongTracks(state, data) {
    state.longTracks = data
  },
  setMediumTracks(state, data) {
    state.mediumTracks = data
  },
  setShortTracks(state, data) {
    state.shortTracks = data
  },
  setLongArtists(state, data) {
    state.longArtists = data
  },
  setMediumArtists(state, data) {
    state.mediumArtists = data
  },
  setShortArtists(state, data) {
    state.shortArtists = data
  },
  activeTracksChange(state, data) {
    state.activeTracksRange = data
  },
  activeArtistsChange(state, data) {
    state.activeArtistsRange = data
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const redisUrl = `${clientUrl}/api/spotify/data/`
      const {
        data: { is_connected }
      } = await axios.get(`${redisUrl}is_connected`)

      commit('connectionChange', is_connected)

      if (Boolean(is_connected)) {
        const {
          data: { item, currentSong }
        } = await axios.get(`${clientUrl}/api/spotify/now-playing`)
        commit('nowPlayingChange', item)
        commit('isPlayingChange', currentSong)
      }
    } catch (err) {
      console.error(err)
    }
  },
  updateProgress: ({ commit, state }, props) => {
    commit('progressChange', props)
    return state.trackProgress
  },
  updateTrack: ({ commit, state }, nowPlaying) => {
    commit('nowPlayingChange', nowPlaying)
    return state.nowPlaying
  },
  updateStatus: ({ commit, state }, isPlaying) => {
    commit('isPlayingChange', isPlaying)
    return state.isPlaying
  },
  updateConnection: ({ commit, state }, isConnected) => {
    commit('connectionChange', isConnected)
    return state.isConnected
  },
  setLong: ({ commit, state }, { prop, data }) => {
    prop === 'tracks'
      ? commit('setLongTracks', data)
      : commit('setLongArtists', data)
  },
  setMedium: ({ commit, state }, { prop, data }) => {
    prop === 'tracks'
      ? commit('setMediumTracks', data)
      : commit('setMediumArtists', data)
  },
  setShort: ({ commit, state }, { prop, data }) => {
    prop === 'tracks'
      ? commit('setShortTracks', data)
      : commit('setShortArtists', data)
  },
  updateActiveArtistsRange: ({ commit, state }, prop) => {
    prop === 'long'
      ? commit('activeArtistsChange', state.longArtists)
      : prop === 'medium'
      ? commit('activeArtistsChange', state.mediumArtists)
      : commit('activeArtistsChange', state.shortArtists)
  },
  updateActiveTracksRange: ({ commit, state }, prop) => {
    prop === 'long'
      ? commit('activeTracksChange', state.longTracks)
      : prop === 'medium'
      ? commit('activeTracksChange', state.mediumTracks)
      : commit('activeTracksChange', state.shortTracks)
  }
}
