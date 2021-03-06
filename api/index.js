const express = require('express');
const redis = require('async-redis');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors());

function connectToRedis() {
  const redisClient = redis.createClient(process.env.REDIS_URL)
  redisClient.on('connect', () => {
    console.log('\n Redis client connected \n')
  })
  redisClient.on('error', err => {
    console.error(`\n Redis client could not connect: ${err} \n`)
  })
  return redisClient
}


/*
  req.params is an object so instead of using req.params.key 
  to get the parameter value, we are using destructuring.
  Please google nested object destructuring if you are still confused.
*/ 

app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {
  try {
    if (key === ('refresh_token' || 'access_token'))
      throw { error: 'Cannot get protected stores.' }
    
    const { value } = query
    const reply = await callStorage(...storageArgs(key, { value }))

    res.send({ [key]: reply })
  } catch (err) {
    console.error(`\n There was an error at /api/spotify/data: ${err} \n`)
    res.send(err)
  }
})

function storageArgs(key, props) {
  const { expires, body, value } = props //Destructuring props object
  const val = Boolean(body) ? JSON.stringify(body) : value
  return [
    Boolean(val) ? 'set' : 'get',
    key,
    val,
    Boolean(expires) ? 'EX' : null,
    expires
  ].filter(arg => Boolean(arg)) //This filter removes any null value from the array
}

async function callStorage(method, ...args) {
  const redisClient = connectToRedis()
  const response = await redisClient[method](...args)
  redisClient.quit()
  return response
}


app.get('/spotify/callback', async ({ query: { code } }, res) => {
  try {
    const { data } = await getSpotifyToken({
      code,
      grant_type: 'authorization_code'
    })
    const { access_token, refresh_token, expires_in } = data
    const {
      data: { id }
    } = await getUserData(access_token)

    if (id !== process.env.SPOTIFY_USER_ID)
      throw "You aren't the droid we're looking for."
    callStorage(...storageArgs('is_connected', { value: true }))
    callStorage(...storageArgs('refresh_token', { value: refresh_token }))
    callStorage(
      ...storageArgs('access_token', {
        value: access_token,
        expires: expires_in
      })
    )

    const success = 'Welcome Back'
    res.redirect(`/auth?success=${success}`)
  } catch (err) {
    console.error(
      `\n There was an error at /api/spotify/callback: ${err} \n`
    )
    res.redirect(`/auth?message=${err}`)
  }
})


/*
  single expression so using implicit return. 
  You can read about implicit returns here :
  https://jaketrent.com/post/javascript-arrow-function-return-rules/  
*/

const getSpotifyToken = (props = {}) => 
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      redirect_uri: `${process.env.CLIENT_URL}/api/spotify/callback`,
      ...props
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

const getUserData = access_token =>
  axios.get(`${spotifyBaseUrl}me`, {
    headers: {
      withCredentials: true,
      Authorization: `Bearer ${access_token}`
    }
  })

async function getAccessToken() {
  const redisClient = connectToRedis()
  const accessTokenObj = { value: await redisClient.get('access_token') }
  if (!Boolean(accessTokenObj.value)) {
    const refresh_token = await redisClient.get('refresh_token')
    const {
      data: { access_token, expires_in }
    } = await getSpotifyToken({
      refresh_token,
      grant_type: 'refresh_token'
    })
    Object.assign(accessTokenObj, {
      value: access_token,
      expires: expires_in
    })
    callStorage(...storageArgs('access_token', { ...accessTokenObj }))
  }
  redisClient.quit()
  return accessTokenObj.value
}

app.get('/spotify/now-playing/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const response = await axios.get(
      `${spotifyBaseUrl}me/player/currently-playing`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const { data } = response
    setLastPlayed(access_token, data)
    const reply = await callStorage('get', 'last_played')
    res.send({
      item: JSON.parse(reply),
      is_playing: Boolean(data.is_playing),
      progress_ms: data.progress_ms || 0
    })
  } catch (err) {
    res.send({ error: err.message })
  }
})

async function setLastPlayed(access_token, item) {
  if (!Boolean(item)) {
    const { data } = await axios.get(
      `${spotifyBaseUrl}me/player/recently-played`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    postStored(data.items[0].track)
  } else {
    postStored(item.item)
  }
}

function postStored(props) {
  callStorage(
    ...storageArgs('last_played', {
      body: props
    })
  )
}

app.get('/spotify/top-tracks/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const shortTracks = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const mediumTracks = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const longTracks = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const { data: shortdata } = shortTracks
    const { data: mediumdata } = mediumTracks
    const { data: longdata } = longTracks
    // setLastPlayed(access_token, data)
    // const reply = await callStorage('get', 'last_played')
    res.send({ short: shortdata, medium: mediumdata, long: longdata })
  } catch (err) {
    res.send({ error: err.message })
  }
})

app.get('/spotify/top-artists/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const shortArtists = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const mediumArtists = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const longArtists = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const { data: shortdata } = shortArtists
    const { data: mediumdata } = mediumArtists
    const { data: longdata } = longArtists

    res.send({ short: shortdata, medium: mediumdata, long: longdata })
  } catch (err) {
    res.send({ error: err.message })
  }
})

app.get('/spotify/recent-tracks/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    
    const { data } = response
    res.send({ item: data.items })
  } catch (err) {
    res.send({ error: err.message })
  }
})

app.get('/spotify/playlists/', async (req, res) => {
  try {
    const access_token = await getAccessToken()
    const response = await axios.get(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const { data } = response
    res.send({ item: data.items })
  } catch (err) {
    res.send({ error: err.message })
  }
})

app.get('/spotify/playlist/:id', async (req, res) => {
  try {
    const id = req.params.id
    const access_token = await getAccessToken()
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    
    const { data } = response
    res.send({ item: data })
  } catch (err) {
    res.send({ error: err.message })
  }
})

module.exports = {
  path: '/api/',
  handler: app
}