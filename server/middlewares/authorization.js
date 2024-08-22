const { Chat } = require("../models")
module.exports = async (req, res, next) => {
  try {
    let UserId = req.user.id
    let chat = await Chat.findByPk(req.params.id)
    if (!chat) throw { name: "NOT_FOUND" }
    if (chat.UserId != UserId) throw { name: "NOT_OWNER" }
    next()
  } catch (error) {
    next(error)
  }
}