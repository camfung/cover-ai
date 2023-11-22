const express = require("express");
const userController = require("./userController");
const spotifyController = require("./spotifyController");
// const productController = require("./productController");
// import other controllers

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

// spotify routes
router.get("/spotify-login", spotifyController.spotifyLogin);
router.get("/spotify-callback", spotifyController.callback);
router.get("/test", spotifyController.test);
module.exports = router;
