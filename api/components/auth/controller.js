const auth = require('../../../auth')
const TABLE = 'auth'

module.exports = (store = require('../../../store/dummy')) => {
  async function login (username, password) {
    const user = await store.query(TABLE, { username })

    if (user.password === password) {
      return auth.sign(user)
    } else {
      throw new Error('Invalid info')
    }
  }

  function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = data.password
    }

    return store.upsert(TABLE, authData)
  }

  return {
    upsert,
    login
  }
}
