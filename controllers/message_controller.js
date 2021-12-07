const Message = require("../models/messageModel");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res) => { 
    res.render("message_form", { title: "Create a new message" });
};

exports.create_message_post = [
    body("messageTitle")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please enter a title")
        .escape(),
    body("messageText")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please enter a message")
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("message_form", { title: "Create a new message", errors: errors.array() });
        }

        const message = new Message({
            user: req.user._id,
            title: req.body.messageTitle,
            text: req.body.messageText,
            timestamp: Date.now()
        });

        await message.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
];

exports.delete_message_post = (req, res, next) => {
    Message.findByIdAndDelete(req.body.messageId, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};