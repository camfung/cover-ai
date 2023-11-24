const PlaylistService = require("../services/PlaylistService");

module.exports.getPlaylists = async (req, res) => {
  try {
    const spotifyService = new PlaylistService(req.user.access_token);
    const playlistsData = await spotifyService.getPageOfPlaylists(
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

    const spotifyService = new PlaylistService(req.user.access_token);
    const tracksData = await spotifyService.getPageOfPlaylistTracks(
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
