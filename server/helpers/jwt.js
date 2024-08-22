const jwt = require('jsonwebtoken')
let secretKey = process.env.SECRET

let signPayloadIntoToken = (payload) => jwt.sign(payload, secretKey)
let verifyTokenIntoPayload = (token) => jwt.verify(token, secretKey)

module.exports = {
  signPayloadIntoToken,
  verifyTokenIntoPayload
}