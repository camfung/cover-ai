const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config"); // Adjust the path as necessary
const executeQuery = require("../dao/db").executeQuery; // Adjust the path as necessary
const SpotifyStrategy = require("passport-spotify").Strategy;
// todo This file will need to be customzied according to your strategy
// I will update this as i use more strategies
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const user = await findOrCreateUser(profile, accessToken);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  async function findOrCreateUser(profile, accessToken) {
    try {
      // Check if user exists
      let res = await executeQuery(
        "SELECT * FROM users WHERE spotify_id = $1",
        [profile.id]
      );

      if (res.rows.length > 0) {
        // Update the access token if it has changed
        if (res.rows[0].access_token !== accessToken) {
          await executeQuery(
            "UPDATE users SET access_token = $1, updated_at = CURRENT_TIMESTAMP WHERE spotify_id = $2",
            [accessToken, profile.id]
          );
        }
        return res.rows[0]; // User exists
      }

      // If not, create a new user
      res = await executeQuery(
        "INSERT INTO users (spotify_id, email, display_name, access_token, created_at, updated_at, credits) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10) RETURNING *",
        [profile.id, profile.emails[0].value, profile.displayName, accessToken]
      );

      return res.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
