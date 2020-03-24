const nanoid = require('nanoid')
const auth = require('../auth')
const TABLE = 'user'

module.exports = (store = require('../../../store/dummy')) => {
  async function list () {
    return store.list(TABLE)
  }

  async function get (id) {
    return store.get(TABLE, id)
  }
  async function upsert (body) {
    const user = {
      user: body.name,
      username: body.username
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    if(body.password || body.username){
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
