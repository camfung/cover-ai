const executeQuery = require("./db").executeQuery;
class SystemMessagesDAO {
    async getAllMessages() {
        const query = 'SELECT * FROM messages';
        return await executeQuery(query);
    }

    async getMessageById(id) {
        const query = 'SELECT * FROM messages WHERE id = $1';
        return await executeQuery(query, [id]);
    }

    async createMessage(message) {
        const { content, role, name } = message;
        const query = 'INSERT INTO messages (content, role, name) VALUES ($1, $2, $3) RETURNING *';
        return await executeQuery(query, [content, role, name]);
    }

    async updateMessage(id, message) {
        const { content, role, name } = message;
        const query = 'UPDATE messages SET content = $1, role = $2, name = $3 WHERE id = $4 RETURNING *';
        return await executeQuery(query, [content, role, name, id]);
    }

    async deleteMessage(id) {
        const query = 'DELETE FROM messages WHERE id = $1';
        return await executeQuery(query, [id]);
    }
}

module.exports = new SystemMessagesDAO();
