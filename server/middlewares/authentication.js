const { User } = require("../models")
const { verifyTokenIntoPayload } = require("../helpers/jwt")
module.exports = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    if (!access_token) throw { name: "Token" }
    let { email } = verifyTokenIntoPayload(access_token)
    let result = await User.findOne({ where: { email } })
    if (!result) throw { name: "FORBIDDEN" }
    req.user = { email, id: result.id }
    next()
  } catch (error) {
    next(error)
  }
}