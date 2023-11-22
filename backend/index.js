const express = require("express");
const session = require("express-session");
const controllerRoutes = require("./controllers");
const config = require("./config");
const passport = require("./middlewares/passport"); // Adjust the path as necessary

const app = express();

// Express session setup
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api", controllerRoutes);

app.use(passport.initialize());
app.use(passport.session());

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
