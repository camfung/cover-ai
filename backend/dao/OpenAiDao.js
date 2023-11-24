const openai = require("openai");

class OpenAIDAO {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.openai = new openai({ key: this.apiKey });
  }

  async getImage(options) {
    try {
      let a = 10;
      const response = await this.openai.images.generate({
        prompt: options.prompt,
        model: options.model,
        n: options.n,
        quality: options.quality,
        responseFormat: options.responseFormat,
        size: options.size,
        style: options.style,
      });
      console.log(
        "🚀 ~ file: OpenAIDAO.js:22 ~ OpenAIDAO ~ getImage ~ response:",
        response
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OpenAIDAO;
