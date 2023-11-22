const express = require("express");
const router = express.Router();
const OpenAIService = require("../services/OpenAIService"); // Import your OpenAIService

// Initialize your OpenAIService and OpenAIDAO
const apiKey = "your-openai-api-key"; // Replace with your actual API key
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

module.exports = router;
