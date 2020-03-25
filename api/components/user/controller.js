const auth = require('../auth')
const TABLE = 'user'

module.exports = (store = require('../../../store/mysql')) => {
  async function list () {
    return store.list(TABLE)
  }

  async function get (id) {
    return store.get(TABLE, id)
  }
  async function upsert (body) {
    const user = {
      name: body.name,
      username: body.username
    }

    if (body.id) {
      user.id = body.id
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }
    return store.upsert(TABLE, user)
  }
  async function remove (body) {
    return store.remove(TABLE, body.id)
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}
