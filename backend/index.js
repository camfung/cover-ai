const express = require("express");
const session = require("express-session");
const controllerRoutes = require("./controllers");
const config = require("./config");
const passport = require("passport"); // Adjust the path as necessary
const passportSetup = require("./middlewares/passport");
const storage = require("node-persist");
const executeQuery = require("./dao/db").executeQuery; // Adjust the path as necessary
const cors = require("cors");
const app = express();

app.use(
  session(
    process.env.NODE_ENV == "prod" ? config.prodCookies : config.localCookies
  )
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(express.json());

app.use(async (req, res, next) => {
  if (
    (!req?.user?.access_token && process.env.NODE_ENV == "local") ||
    req.header.noAuth
  ) {
    const user = (await executeQuery("select * from users where id = 9", []))
      .rows[0];
    req.user = {
      ...user,
    };
  }
  next();
});
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
