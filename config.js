module.exports = {
  api: {
    port: process.env.API_PORT || 7000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  }
}
