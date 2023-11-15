const express = require("express");
const {
  register,
  login,
  refereshToken,
  logout,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh-token").post(refereshToken);
router.route("/logout").delete(logout);
router.route("/get-user").get(getUser);

module.exports = router;
