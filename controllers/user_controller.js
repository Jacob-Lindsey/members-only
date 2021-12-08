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

exports.member_upgrade_get = (req, res, next) => {
    res.render("member_upgrade", { title: "Upgrade Your Member Level", memberUser: res.locals.currentUser });
};

exports.member_upgrade_post = [
    body("secretCode")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Please enter a code"),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("member_upgrade", {
                title: "Upgrade Your Member Level",
                memberUser: res.locals.currentUser,
                errors: errors.array(),
            });
        } else if (req.body.secretCode != 'milksteak' || req.body.secretCode != 'iamthedayman' || req.body.secretCode != 'dennisisabastardman') {
            return res.render("member_upgrade", {
                title: "Upgrade Your Member Level",
                memberUser: res.locals.currentUser,
                secretCodeError: "Invalid Code",
            });
        }
        
        const user = new User(res.locals.currentUser);
        if (user.memberLevel == 0) {
            user.memberLevel = 1;
        } else if (user.memberLevel == 1) {
            user.memberLevel = 2;
        } else if (user.memberLevel == 2) {
            user.memberLevel = 3;
            user.isAdmin = true;
        }

        await User.findByIdAndUpdate(
            res.locals.currentUser._id,
            user,
            {},
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect("/");
            }
        );
    },
];

exports.admin_get = (req, res, next) => {
    res.render("admin_form", { title: "Admin Dashboard" });
};