const SystemMessagesDAO = require('../dao/SystemMessagesDAO');

class SystemMessagesService {
    async getAllMessages() {
        return await SystemMessagesDAO.getAllMessages();
    }

    async getMessageById(id) {
        return await SystemMessagesDAO.getMessageById(id);
    }

    async createMessage(message) {
        return await SystemMessagesDAO.createMessage(message);
    }

    async updateMessage(id, message) {
        return await SystemMessagesDAO.updateMessage(id, message);
    }

    async deleteMessage(id) {
        return await SystemMessagesDAO.deleteMessage(id);
    }
}

module.exports = new SystemMessagesService();
