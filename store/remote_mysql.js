const Remote = require('./remote')
const config = require('../config')

module.exports = new Remote(config.mysql_service.host, config.mysql_service.port)
