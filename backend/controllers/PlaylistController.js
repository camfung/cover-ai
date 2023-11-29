const PlaylistService = require("../services/PlaylistService");

module.exports.getPlaylists = async (req, res) => {
  try {
    const playlistService = new PlaylistService(req.user.access_token);
    const playlistsData = await playlistService.getPageOfPlaylists(
      !!req.query?.nextPageOffSet ? req.query.nextPageOffSet : 0
    );
    res.send(playlistsData);
  } catch (error) {
    console.error("Error in getting playlists:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getPlaylistTracks = async (req, res) => {
  try {
    const { playlistId, numTracks = 50, offset = 0 } = req.query;

    if (!playlistId || isNaN(numTracks) || isNaN(offset)) {
      return res.status(400).send("Invalid parameters");
    }

    const playlistService = new PlaylistService(req.user.access_token);
    const tracksData = await playlistService.getPageOfPlaylistTracks(
      playlistId,
      parseInt(numTracks),
      parseInt(offset)
    );
    console.log(
      "🚀 ~ file: playlistController.js:31 ~ module.exports.getPlaylistTracks= ~ tracksData:",
      tracksData
    );
    res.send(tracksData);
  } catch (error) {
    console.error("Error in getting playlist tracks:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.updatePlaylistImage = async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    const playlistId = req.query.playlistId;

    const playlistService = new PlaylistService(req.user.access_token);
    await playlistService.updatePlaylistImage(playlistId, imageUrl);
    res.status(204);
    res.send();
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};
