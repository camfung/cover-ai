const passport = require("passport");
const spotifyLogin = (req, res, next) => {
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-read-currently-playing",
      "ugc-image-upload",
      "playlist-modify-public",
      "playlist-modify-private",
    ],
    showDialog: true,
  })(req, res, next);
};

const callback = (req, res, next) => {
  passport.authenticate("spotify", {
    successRedirect: process.env.CLIENT_URL + "/playlists",
    failureRedirect: process.env.CLIENT_URL + "/login",
  })(req, res, next);
};

module.exports = {
  spotifyLogin,
  callback,
};
