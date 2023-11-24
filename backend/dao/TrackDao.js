const SpotifyWebApi = require("spotify-web-api-node");

class TrackDao {
  constructor(accessToken) {
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(accessToken);
  }

  async getTracksByIds(ids) {
    try {
      const response = await this.spotifyApi.getTracks(ids);
      return response.body;
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  }
}

module.exports = TrackDao;
