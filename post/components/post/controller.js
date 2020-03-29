const TABLE = 'post'

module.exports = (store = require('../../../store/mysql')) => {
  async function list () {
    return store.list(TABLE)
  }

  return {
    list
  }
}
