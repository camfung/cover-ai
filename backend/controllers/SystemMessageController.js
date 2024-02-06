const SystemMessagesService = require('../services/SystemMessagesService');

class SystemMessagesController {
    async getAllMessages(req, res) {
        try {
            const messages = await SystemMessagesService.getAllMessages();
            res.json(messages);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getMessageById(req, res) {
        try {
            const message = await SystemMessagesService.getMessageById(req.params.id);
            res.json(message);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async createMessage(req, res) {
        try {
            const newMessage = await SystemMessagesService.createMessage(req.body);
            res.json(newMessage);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateMessage(req, res) {
        try {
            const updatedMessage = await SystemMessagesService.updateMessage(req.params.id, req.body);
            res.json(updatedMessage);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteMessage(req, res) {
        try {
            await SystemMessagesService.deleteMessage(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new SystemMessagesController();
