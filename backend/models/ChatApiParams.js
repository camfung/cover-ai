export default class ChatAPIParameters {
    constructor() {
        this.messages = []; // Array of messages
        this.model = ''; // ID of the model to use
        this.frequency_penalty = 0; // Number between -2.0 and 2.0
        this.logit_bias = null; // Map of tokens to bias values
        this.logprobs = false; // Boolean to return log probabilities or not
        this.top_logprobs = null; // Integer between 0 and 5
        this.max_tokens = null; // Maximum number of tokens in the chat completion
        this.n = 1; // Number of chat completion choices to generate
        this.presence_penalty = 0; // Number between -2.0 and 2.0
        this.response_format = {}; // Format that the model must output
        this.seed = null; // Seed for deterministic sampling
        this.stop = null; // Sequences to stop token generation
        this.stream = false; // Boolean for partial message deltas
        this.temperature = 1; // Sampling temperature
        this.top_p = 1; // Nucleus sampling probability mass
        this.tools = []; // List of tools the model may call
        this.tool_choice = 'none'; // Controls function calls by the model
        this.user = ''; // Unique identifier for the end-user
    }
}
