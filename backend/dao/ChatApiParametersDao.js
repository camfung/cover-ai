// chatApiParametersDAO.js
const executeQuery = require("../dao/db")
class ChatApiParametersDAO {
    static async get(id) {
        const query = 'SELECT * FROM chat_api_parameters WHERE id = $1';
        return await executeQuery(query, [id]);
    }

    static async create(chatApiParameter) {
        const fields = Object.keys(chatApiParameter);
        const values = Object.values(chatApiParameter);
        const fieldList = fields.join(', ');
        const valuePlaceholders = fields.map((_, index) => `$${index + 1}`).join(', ');

        const query = `INSERT INTO chat_api_parameters (${fieldList}) VALUES (${valuePlaceholders}) RETURNING *`;
        return await executeQuery(query, values);
    }

    static async delete(id) {
        const query = 'DELETE FROM chat_api_parameters WHERE id = $1';
        return await executeQuery(query, [id]);
    }

    static async update(id, chatApiParameter) {
        const fields = Object.keys(chatApiParameter);
        const values = Object.values(chatApiParameter);

        // Construct the SET part of the query
        const setQuery = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

        const query = `UPDATE chat_api_parameters SET ${setQuery} WHERE id = $${fields.length + 1}`;
        return await executeQuery(query, [...values, id]);
    }
}

module.exports = ChatApiParametersDAO;
