const router = require("express").Router();
const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authenticateUser } = require("../middleware/authentication");


// --------LOGIN----------
router.route("/login").post(login);

// --------REGISTER----------
router.route("/register").post(register);


// --------LOGOUT----------
router.route("/logout").post(authenticateUser, logout);


// --------VERIFY EMAIL----------
router.route("/verify-email").post(verifyEmail);

// --------FORGOT PASSWORD----------
router.route("/forgot-password").post(forgotPassword);

// --------RESET PASSWORD----------
router.route("/reset-password").post(resetPassword);
 
module.exports = router;
