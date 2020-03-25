const mysql = require('mysql')
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

module.exports = {
  list
}
