const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => { 
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(err);
        }
        res.render("member_profile", { title: "Profile", userProfile: user });
    })
};

exports.all_members_get = (req, res) => {
    User.find({}, function(err, users) {
        res.render("member_list", { users: users });
    });
};

exports.my_profile_get = (req, res, next) => {
    res.render("my_profile", { title: "My Profile", userProfile: res.locals.currentUser });
};

exports.member_upgrade_get = (req, res) => {
    res.render("member_upgrade", { title: "Upgrade Your Member Level", memberUser: res.locals.currentUser });
};

exports.admin_get = (req, res, next) => {
    res.render("admin_form", { title: "Admin Dashboard" });
};