const SpotifyWebApi = require("spotify-web-api-node");

class PlaylistDao {
  constructor(accessToken) {
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(accessToken);
    this.accessToken = accessToken;
  }
  extractOffsetAndLimitFromUrl(url) {
    if (url) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const offset = parseInt(urlParams.get("offset"));
      const limit = parseInt(urlParams.get("limit"));

      return { offset, limit };
    }
    return null;
  }
  async getPlaylists(nextPageOffset = 0) {
    try {
      const response = await this.spotifyApi.getUserPlaylists({
        limit: 50,
        offset: nextPageOffset,
      });
      const playlists = response.body.items;
      const nextPage = response.body.next;

      return {
        playlists: playlists,
        nextPage: this.extractOffsetAndLimitFromUrl(nextPage),
      };
    } catch (error) {
      console.error("Error getting playlists:", error);
      throw error;
    }
  }

  async getPlaylistTracks(playlistId, numTracks, offset) {
    try {
      const response = await this.spotifyApi.getPlaylistTracks(playlistId, {
        limit: numTracks,
        offset: offset,
      });
      return response.body.items;
    } catch (e) {
      console.error("error in getting playlist tracks: ", e);
      throw e;
    }
  }

  async updatePlaylistImage(playlistId, base64Image) {
    const response = await this.spotifyApi.uploadCustomPlaylistCoverImage(
      playlistId,
      base64Image
    );
  }
}

module.exports = PlaylistDao;
