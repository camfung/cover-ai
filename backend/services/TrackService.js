const TrackDao = require("../dao/TrackDao");

class TrackService {
  constructor(accessToken) {
    this.tracksDao = new TrackDao(accessToken);
  }

  async getTracksByIds(ids) {
    try {
      const data = await this.tracksDao.getTracksByIds(ids);
      return data;
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  }
}

module.exports = TrackService;
