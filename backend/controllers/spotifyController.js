const passport = require("../middlewares/passport");

const spotifyLogin = (req, res, next) => {
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  })(req, res, next);
};

const callback = (req, res, next) => {
  passport.authenticate("spotify", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })(req, res, next);
};

const test = (req, res) => {
  res.send("test");
};

module.exports = {
  spotifyLogin,
  test,
  callback,
};
