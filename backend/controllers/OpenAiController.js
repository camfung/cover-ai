const express = require("express");
const router = express.Router();
const OpenAIService = require("../services/OpenAiService"); // Import your OpenAIService
const TrackService = require("../services/TrackService");

// Initialize your OpenAIService and OpenAIDAO
const openAIService = new OpenAIService();

// Define a route to generate images
router.get("/generate-images", async (req, res) => {
  try {
    const {
      prompt,
      model,
      numberOfImages,
      quality,
      responseFormat,
      size,
      style,
    } = req.query;

    const generatedImages = await openAIService.generateImages(
      prompt,
      model,
      numberOfImages,
      quality,
      responseFormat,
      size,
      style
    );

    res.json({ images: generatedImages });
  } catch (error) {
    console.error("Error generating images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/generate-playlist-cover", async (req, res) => {
  try {
    const trackService = new TrackService(req.user.access_token);
    const playlistIds = req.body.selectedSongIds;
    const tracks = await trackService.getTracksByIds(playlistIds);
    console.log(
      "🚀 ~ file: OpenAiController.js:43 ~ router.post ~ tracks:",
      tracks
    );
    const prompt = tracks.tracks.map((track) => track.name);
    const { model, numberOfImages, quality, responseFormat, size, style } =
      req.query;

    const generatedImages = await openAIService.generateImages(
      prompt,
      model,
      numberOfImages,
      quality,
      responseFormat,
      size,
      style
    );

    res.json({ images: generatedImages });
  } catch (error) {
    console.error("Error generating images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
