const OpenAIDAO = require("../dao/OpenAIDAO"); // Import the DAO class
const config = require("../config");
class OpenAIService {
  constructor() {
    this.openAIDAO = new OpenAIDAO(config.OPENAI_KEY);
  }

  async generateImages(
    prompt,
    model,
    numberOfImages,
    quality,
    responseFormat,
    size,
    style
  ) {
    try {
      const finalPrompt =
        "A play list cover that goes follows the vibe of the following songs: " +
        prompt;
      const options = {
        prompt: finalPrompt,
        model: model || "dall-e-2",
        n: numberOfImages || 1,
        quality: quality || "standard",
        response_format: responseFormat || "url",
        size: size || "256x256",
        style: style || "vivid",
      };

      const generatedImages = await this.openAIDAO.getImage(options);
      return generatedImages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OpenAIService;
