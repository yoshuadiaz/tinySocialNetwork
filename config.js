require('dotenv').config()
module.exports = {
  api: {
    port: process.env.API_PORT || 7000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || '',
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DATABASE || ''
  },
  mysql_service: {
    port: process.env.MYSQL_SERVICE_PORT || 7001
  }
}
