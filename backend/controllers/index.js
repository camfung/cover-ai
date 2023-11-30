const express = require("express");
const userController = require("./UserController");
const spotifyController = require("./SpotifyController");
const playlistsController = require("./PlaylistController");
const openAiController = require("./OpenAiController");
// const productController = require("./productController");
// import other controllers

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/get-credits", userController.getCredits);
router.use(openAiController);

// spotify routes
router.get("/spotify-login", spotifyController.spotifyLogin);
router.get("/callback", spotifyController.callback);
router.get("/get-playlists", playlistsController.getPlaylists);
router.get("/get-playlist-tracks", playlistsController.getPlaylistTracks);
router.get("/upload-playlist-image", playlistsController.updatePlaylistImage);
module.exports = router;
