const PlaylistDao = require("../dao/PlaylistDao.js"); // Assuming SpotifyDAO is in a separate file

class PlaylistService {
  constructor(accessToken) {
    this.spotifyDAO = new PlaylistDao(accessToken);
  }

  async getPageOfPlaylists(nextPageOffSet) {
    try {
      const data = await this.spotifyDAO.getPlaylists(nextPageOffSet);
      return data;
    } catch (error) {
      console.error(
        "Error in SpotifyService - getFirstPageOfPlaylists:",
        error
      );
      throw error;
    }
  }

  async getPageOfPlaylistTracks(playlistId, numTracks, offset) {
    try {
      const data = await this.spotifyDAO.getPlaylistTracks(
        playlistId,
        numTracks,
        offset
      );
      return data;
    } catch (error) {
      console.error(
        "Error in SpotifyService - getPageOfPlaylistTracks:",
        error
      );
      throw error;
    }
  }
}

module.exports = PlaylistService;
