const mysql = require('mysql')
const nanoid = require('nanoid')
const { mysql: { host, user, password, database } } = require('../config')

const dbcong = {
  host,
  user,
  password,
  database
}

// Connect

let connection

function handleConnection () {
  connection = mysql.createConnection(dbcong)

  connection.connect(err => {
    if (err) {
      console.error('[DB err]', err)
      setTimeout(handleConnection, 2000)
    } else {
      console.log('DB Connected')
    }
  })

  connection.on('error', err => {
    console.error('[DB err]', err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection()
    } else {
      throw err
    }
  })
}

handleConnection()

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

function get (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

function insert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, { ...data, id: nanoid() }, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function update (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

function upsert (table, data) {
  if (data && data.id) {
    return update(table, data)
  } else {
    return insert(table, data)
  }
}

function query (table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if (err) return reject(err)
      resolve(res[0] || null)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
}
