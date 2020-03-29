const redis = require('redis')

const config = require('../config')

const { host, port, password } = config.redis

const client = redis.createClient({
  host,
  port,
  password
})

function list (table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err)
      const response = data ? JSON.stringify(data) : null
      resolve(response)
    })
  })
}

function get (table, id) {
  const key = `${table}_${id}`
  return list(key)
}

async function upsert (table, data) {
  let key = table
  if (data && data.id) {
    key = `${key}_${data.id}`
  }

  client.setex(key, 10, JSON.stringify(data))
  return true
}

module.exports = {
  list,
  get,
  upsert
}
