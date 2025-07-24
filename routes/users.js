const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/users.js");
const { storeReturnTo } = require("../middleware.js");

// ========== SIGNUP ROUTES ==========
router
  .route("/signup")
  .get(userController.signup)            // Show signup form
  .post(userController.signupUser);      // Handle signup form submit

// ========== LOGIN ROUTES ==========
router
  .route("/login")
  .get(userController.login)             // Show login form
.post(
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  userController.loginUser
);


// ========== LOGOUT ROUTE ==========
router.get("/logout", userController.logoutUser); // Log out user

module.exports = router;
