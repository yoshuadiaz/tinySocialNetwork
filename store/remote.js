const request = require('request')

function createRemoteDB (host, port) {
  const URL = `http://${host}:${port}`

  function list (table) {
    return req('GET', table)
  }
  function get (table, id) {
    req('GET', table, id)
  }
  function upsert (table, data) {
    if (data.id) {
      return update(table, data)
    }
    return insert(table, data)
  }
  function query (table, query, join) {
    req('GET', table, query, join)
  }
  function insert (table, data) {
    req('POST', table, data)
  }
  function update (table, data) {
    req('PUT', table, data)
  }

  function req (method, table, data) {
    let url = `${URL}/${table}`
    let body = ''

    if (method === 'GET' && data) {
      url += `/${data}`
    } else if (data) {
      body = JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'Content-type': 'application/json'
        },
        url,
        body
      }, (err, req, body) => {
        if (err) {
          console.error('Error con la DB')
          return reject(err.message)
        }

        const resp = JSON.parse(body)
        return resolve(resp.body)
      })
    })
  }

  return {
    list,
    get,
    upsert,
    query,
    insert,
    update
  }
}

module.exports = createRemoteDB
