const nanoid = require('nanoid')
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

  return {
    list,
    get,
    upsert,
    remove,
    follow
  }
}
