function errorHandler(err, req, res, next) {
  let code = 500
  let msg = `Internal server error`

  if (err.name === `INVALID_USER`) {
    code = 401
    msg = `Invalid email/password`
  } else if (err.name === `FORBIDDEN` || err.name === `JsonWebTokenError` || err.name === `Invalid token`) {
    code = 401
    msg = `Invalid token`
  } else if (err.name === `NOT_FOUND`) {
    code = 404
    msg = `Not found`
  } else if (err.name === `NOT_OWNER`) {
    code = 403
    msg = `You are not authorized`
  } else if (err.name === `SequelizeUniqueConstraintError` || err.name === `SequelizeValidationError`) {
    code = 400
    msg = err.errors[0].message
  } else if (err.name === `NO_EMAIL`) {
    code = 400
    msg = `Email is required`
  } else if (err.name === `NO_PASSWORD`) {
    code = 400
    msg = `Password is required`
  }

  res.status(code).json({ message: msg })
}

module.exports = errorHandler