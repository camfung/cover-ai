const express = require("express");
const session = require("express-session");
const controllerRoutes = require("./controllers");
const config = require("./config");
const passport = require("passport"); // Adjust the path as necessary
const passportSetup = require("./middlewares/passport");
const executeQuery = require("./dao/db").executeQuery; // Adjust the path as necessary
const cors = require("cors");
const app = express();

// Express session setup
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
passportSetup(passport);
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
app.use("/api", controllerRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
