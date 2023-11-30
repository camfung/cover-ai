const PlaylistDao = require("../dao/PlaylistDao.js"); // Assuming SpotifyDAO is in a separate file
const axios = require("axios");
const sharp = require("sharp");

class PlaylistService {
  constructor(accessToken) {
    this.playlistDao = new PlaylistDao(accessToken);
  }

  async getPageOfPlaylists(nextPageOffSet) {
    try {
      const data = await this.playlistDao.getPlaylists(nextPageOffSet);
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
      const data = await this.playlistDao.getPlaylistTracks(
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

  async updatePlaylistImage(playlistId, imageUrl) {
    try {
      const base64Image = await this.downloadImageAsBase64(imageUrl);
      await this.playlistDao.updatePlaylistImage(playlistId, base64Image);
    } catch (error) {
      throw error;
    }
  }

  resizeImage = async (imageBuffer, size) => {
    const resizedImage = await sharp(imageBuffer)
      .resize({
        height: size,
        width: size,
      })
      .toBuffer();
    return resizedImage;
  };

  shrinkTo256Kb = async (imageBuffer, initialSize) => {
    let currentSideLength = initialSize;
    let image = imageBuffer;
    let metadata = await sharp(image).metadata();
    let size = metadata.size / 1024; // in KB

    while (size > 150) {
      currentSideLength = Math.ceil(currentSideLength * 0.95);
      image = await this.resizeImage(image, currentSideLength);
      metadata = await sharp(image).metadata();
      size = metadata.size / 1024;
    }

    return image;
  };

  async downloadImageAsBase64(url) {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      const jpgImage = await sharp(response.data)
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .toBuffer();
      const imageMetaData = await sharp(response.data).metadata();
      const imageSideLength = imageMetaData.width;
      const shrunkImage = await this.shrinkTo256Kb(jpgImage, imageSideLength);
      const base64JpgImage = await sharp(shrunkImage)
        .toBuffer()
        .then((data) => data.toString("base64"));
      return base64JpgImage;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PlaylistService;
