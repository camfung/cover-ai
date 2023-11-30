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

router.get("/generate-playlist-cover", async (req, res) => {
  try {
    const trackService = new TrackService(req.user.access_token);
    const trackIds = req.query.selectedSongIds.split(",");
    const result = await trackService.getTracksByIds(trackIds);
    const tracksArray = result.tracks.map((track) => track.name);
    const prompt = tracksArray.join(" ");
    const {
      model,
      numberOfImages,
      quality,
      responseFormat,
      size,
      style,
      debug,
    } = req.query;
    const a = debug === "true";
    let generatedImages;
    if (debug === "false") {
      generatedImages = await openAIService.generateImages(
        prompt,
        model,
        Number(numberOfImages),
        quality,
        responseFormat,
        size,
        style
      );
    } else {
      generatedImages = {
        data: [
          {
            url: "https://exposureee.in/wp-content/uploads/2023/07/image-1536x1536.png",
          },
        ],
      };
    }
    res.status(200).json({ images: generatedImages });
  } catch (error) {
    console.error("Error generating images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
