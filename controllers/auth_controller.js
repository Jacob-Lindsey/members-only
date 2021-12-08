const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.login_get = (req, res) => {
    if (res.locals.currentUser) {
        return res.redirect("/");
    }
    res.render("login_form", { title: "Login" });
};

exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
});

exports.register_get = (req, res) => {
    res.render("register_form", { title: "Create an account" });
};

exports.register_post = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Username must be at least 4 characters"),
    body("firstName")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("lastName")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Password must be at least 8 characters"),
    body("confirmPassword")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Password must be at least 8 characters")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("register_form", {
                title: "Create an account",
                passwordConfirmError: "Passwords do not match",
            });
        }

        try {
            const doesUserExist = await User.find({ username: req.body.username });
            if (doesUserExist.length > 0)
                return res.render("register_form", {
                    title: "Create an account",
                    error: "User already exists",
                });
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    return next(err);
                }
                const user = new User({
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hashedPassword,
                    memberLevel: 1,
                    isAdmin: false,
                }).save((err) => (err ? next(err) : res.redirect("/")));
            });
        } catch (err) {
            return next(err);
        }
    },
];

exports.logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
};