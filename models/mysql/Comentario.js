import bcrypt from 'bcrypt';
import connection from '../../libs/connection.js';

export class ComentarioModel {
    static async getAll({ current_page, per_page }) {
        try {
            const [result] = await connection.query("SELECT * FROM comentario ORDER BY last_update DESC;");
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async create({ data }) {
        try {
            const [result] = await connection.query("INSERT INTO comentario (id_usuario, username, comentario, titulo, id_padre) VALUES (?, ?, ?, ?, ?);", [data.id_usuario, data.username, data.comentario, data.titulo, data.id_padre]);
            if (result.affectedRows === 1) return { message: 'Comentario enviado correctamente', id: result.insertId }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async getById({ id }) {
        try {
            const [result] = await connection.query("SELECT * FROM comentario WHERE id_padre = ?;", [id]);
            if (result.length === 0) return []
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
