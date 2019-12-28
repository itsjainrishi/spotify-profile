const express = require('express');
const redis = require('async-redis');
require('dotenv').config();
const app = express()

app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {
  res.send('Success! 🎉\n')
})


module.exports = {
  path: '/api/',
  handler: app
}