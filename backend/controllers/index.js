const express = require("express");
const userController = require("./UserController");
const spotifyController = require("./SpotifyController");
const playlistsController = require("./PlaylistController");
const openAiController = require("./OpenAiController");
const stirThePotController = require("./StirThePotController");
const SystemMessagesController = require("./SystemMessageController")
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

// stir the port
router.post("/card", stirThePotController.CreateCard);
router.get("/deck", stirThePotController.getAllDecks);
router.get("/card", stirThePotController.getAllCardsForDeck);
router.post("/deck", stirThePotController.createDeck);

// messages controller
router.get('/messages', SystemMessagesController.getAllMessages);
router.get('/messages/:id', SystemMessagesController.getMessageById);
router.post('/messages', SystemMessagesController.createMessage);
router.put('/messages/:id', SystemMessagesController.updateMessage);
router.delete('/messages/:id', SystemMessagesController.deleteMessage);

module.exports = router;
