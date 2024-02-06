// chatApiParametersService.js
const ChatApiParametersDAO = require('../dao/ChatApiParametersDao');

class ChatApiParametersService {
    static async getChatApiParameter(id) {
        return await ChatApiParametersDAO.get(id);
    }

    static async createChatApiParameter(chatApiParameter) {
        return await ChatApiParametersDAO.create(chatApiParameter);
    }

    static async deleteChatApiParameter(id) {
        return await ChatApiParametersDAO.delete(id);
    }

    static async updateChatApiParameter(id, chatApiParameter) {
        return await ChatApiParametersDAO.update(id, chatApiParameter);
    }
}

module.exports = ChatApiParametersService;
