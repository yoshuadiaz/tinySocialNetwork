const Remote = require('./remote')
const config = require('../config')

module.exports = new Remote(config.cache_service.host, config.cache_service.port)
