const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config"); // Adjust the path as necessary
const executeQuery = require("../dao/db").executeQuery; // Adjust the path as necessary

// todo This file will need to be customzied according to your strategy
// I will update this as i use more strategies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let result = await executeQuery("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(null, false);
    }
  } catch (e) {
    console.error(e);
    done(e);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
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
  const client = await pool.connect();
  try {
    // Check if user exists
    let res = await client.query("SELECT * FROM users WHERE google_id = $1", [
      profile.id,
    ]);
    if (res.rows.length > 0) {
      // update the access token if it has changed
      if (res.rows[0].access_token !== accessToken) {
        await client.query(
          "UPDATE users SET access_token = $1, access_token_last_updated = CURRENT_TIMESTAMP WHERE google_id = $2",
          [accessToken, profile.id]
        );
      }
      return res.rows[0]; // User exists
    }

    // If not, create new user
    res = await client.query(
      "INSERT INTO users (google_id, email, name, accessToken, access_token_last_updated) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        profile.id,
        profile.emails[0].value,
        profile.displayName,
        accessToken,
        Date.now(),
      ]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

module.exports = passport;
