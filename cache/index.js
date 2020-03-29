const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const router = require('./network')

const port = config.cache_service.port

const app = express()

app.use(bodyParser.json())

// Routes
app.use('/', router)

app.listen(port, () => {
  console.log(`Redis service listen on port: ${port}`)
})
