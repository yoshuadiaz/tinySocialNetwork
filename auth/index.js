const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret
const error = require('../utils/error')

async function sign (data) {
  return jwt.sign(data, secret)
}

function getToken (auth) {
  if (!auth) {
    throw error('Without token', 400)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 400)
  }

  const token = auth.replace('Bearer ', '')

  return token
}

function verify (token) {
  return jwt.verify(token, secret)
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

const check = {
  own: function (req, owner) {
    const tokenDecoded = decodeHeader(req)

    if (tokenDecoded.id !== owner) {
      throw error('Forbiden', 401)
    }
  }
}

module.exports = {
  sign,
  check
}
