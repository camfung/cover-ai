// chatApiParametersController.js
const express = require('express');
const router = express.Router();
const ChatApiParametersService = require('../services/ChatApiParametersService');

router.get('/:id', async (req, res) => {
    try {
        const data = await ChatApiParametersService.getChatApiParameter(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await ChatApiParametersService.createChatApiParameter(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ChatApiParametersService.deleteChatApiParameter(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const data = await ChatApiParametersService.updateChatApiParameter(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
