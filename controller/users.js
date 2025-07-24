const User = require("../models/user.js");

// Show signup form
module.exports.signup = (req, res) => {
  res.render("users/signup.ejs");
};

// Handle signup
module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Show login form
module.exports.login = (req, res) => {
  res.render("users/login.ejs");
};

// Handle login
module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Handle logout
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};
