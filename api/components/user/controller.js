const nanoid = require('nanoid')
const TABLE = 'user'

module.exports = (injectedStore = require('../../../store/dummy')) => {
  const store = injectedStore

  async function list () {
    return store.list(TABLE)
  }

  async function get (id) {
    return store.get(TABLE, id)
  }
  async function upsert (body) {
    const user = {
      name: body.name
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
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
