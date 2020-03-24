const jwt = require('jsonwebtoken')

async function sign (data) {
  return jwt.sign(data, 'secret')
}

module.exports = {
  sign
}
