exports.success = (req, res, message, status) => {
  const statusCode = status || 200
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: message
  })
}

exports.error = (req, res, message, status) => {
  const statusCode = status || 500

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: message
  })
}
