const store = require('../../../store/remote_mysql')
const ctrl = require('./controller')

module.exports = ctrl(store)
