const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLE = 'auth'

module.exports = (store = require('../../../store/mysql')) => {
  async function login (username, password) {
    const user = await store.query(TABLE, { username })

    return bcrypt.compare(password, user.password)
      .then(async isLoged => {
        if (isLoged) {
          return auth.sign({ ...user })
        } else {
          throw new Error('Invalid info')
        }
      })
  }

  async function upsert (data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10)
    }

    return store.insert(TABLE, authData)
  }

  return {
    upsert,
    login
  }
}
