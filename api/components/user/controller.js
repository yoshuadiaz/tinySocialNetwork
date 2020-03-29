const nanoid = require('nanoid')
const auth = require('../auth')
const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy'),
  cache = require('../../../store/dummy')
) => {
  async function list () {
    let users = await cache.list(TABLE)

    if (!users) {
      console.log('Not in cache, search in DB')
      users = store.list(TABLE)
      cache.upsert(TABLE, users)
    } else {
      console.log('Retrieve data from cache')
    }

    return users
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
    } else {
      user.id = nanoid()
    }

    if (body.password && body.username && !body.id) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
      return store.insert(TABLE, user)
    }

    return store.update(TABLE, user)
  }
  async function remove (body) {
    return store.remove(TABLE, body.id)
  }

  async function follow (userFrom, userTo) {
    return store.upsert(`${TABLE}_follow`, {
      user_from: userFrom,
      user_to: userTo
    })
  }

  async function following (user) {
    const join = {}
    join[TABLE] = 'user_to'
    const query = { user_from: user }

    return store.query(`${TABLE}_follow`, query, join)
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following
  }
}
