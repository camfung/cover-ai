const express = require("express");
const userController = require("./userController");
const spotifyController = require("./spotifyController");
const playlistsController = require("./playlistController");
const openAiController = require("./OpenAiController");
// const productController = require("./productController");
// import other controllers

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.use(openAiController);

// spotify routes
router.get("/spotify-login", spotifyController.spotifyLogin);
router.get("/callback", spotifyController.callback);
router.get("/get-playlists", playlistsController.getPlaylists);
router.get("/get-playlist-tracks", playlistsController.getPlaylistTracks);
module.exports = router;
