const express = require('express');
const redis = require('async-redis');
require('dotenv').config();

const app = express()
app.use(express.json())

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

app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {

/*
  req.params is an object so instead of using req.params.key 
  to get the parameter value, we are using destructuring.
  Please google nested object destructuring if you are still confused.
*/ 

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

module.exports = {
  path: '/api/',
  handler: app
}