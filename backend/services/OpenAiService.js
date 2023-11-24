const OpenAIDAO = require("../dao/OpenAiDao"); // Import the DAO class
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
        "A alblum cover that follows the vibe of the following song titles: " +
        prompt;
      const options = {
        prompt: finalPrompt,
        model: model || "dall-e-3",
        n: numberOfImages || 1,
        quality: quality || "standard",
        response_format: responseFormat || "url",
        size: size || "1024x1024",
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
