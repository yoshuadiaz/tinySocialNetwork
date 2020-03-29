const config = require('../../../config')
let store

if (config.remoteDB) {
  store = require('../../../store/remote_mysql')
} else {
  store = require('../../../store/mysql')
}
const ctrl = require('./controller')

module.exports = ctrl(store)
