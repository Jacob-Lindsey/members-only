var express = require('express');
var router = express.Router();

const auth_controller = require("../controllers/auth_controller");
const index_controller = require("../controllers/index_controller");
const message_controller = require("../controllers/message_controller");
const user_controller = require("../controllers/user_controller");

/// ----------- HOMEPAGE ---------- ///
router.get("/", index_controller.index);

/// ----------- CREATE/DELETE MESSAGE ---------- ///
router.get("/create-message", message_controller.create_message_get);
router.post("/create-message", message_controller.create_message_post);
router.post("/delete-message/:id", message_controller.delete_message_post);

/// ----------- REGISTER ---------- ///
router.get("/register", auth_controller.register_get);
/* router.post("/register", auth_controller.register_post); */

/// ----------- LOGIN/LOGOUT ---------- ///
router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);
router.get("/logout", auth_controller.logout_get);

/// ----------- MEMBER VIEWS ---------- ///
router.get("/members", user_controller.all_members_get);
router.get("/member/:id", user_controller.member_get);
router.get("/upgrade", user_controller.member_upgrade_get);
/* router.post("/upgrade", user_controller.member_upgrade_post); */

/// ------------- MY PROFILE ------------ ///
router.get("/my-profile", user_controller.my_profile_get);

/// ----------- ADMIN DASHBOARD ---------- ///
router.get("/admin", user_controller.admin_get);
/* router.post("/admin", user_controller.admin_post); */

module.exports = router;
