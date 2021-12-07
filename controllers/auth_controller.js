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

/* exports.register_post = [

]; */

exports.logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
};