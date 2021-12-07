const Message = require("../models/messageModel");

exports.index = async (req, res, next) => {
    try {
        const messages = await Message.find().sort([["timestamp", "ascending"]]).populate("user");
        return res.render("index", { title: 'The Underground', user: req.user, messages: messages });
    } catch (err) {
        return next(err);
    }
};