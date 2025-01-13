import bcrypt from 'bcrypt';
import connection from '../../libs/connection.js';

export class ProfesorModel {
    static async getAll({ current_page, per_page }) {
        try {
            const [result] = await connection.query("SELECT usuario.id_usuario, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario.username, profesor.admin FROM usuario INNER JOIN profesor ON usuario.id_usuario = profesor.id_usuario;");
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async create({ data }) {
        try {
            const [usuario] = await connection.query("SELECT username, correo FROM usuario WHERE correo = ?;", [data.email]);
            if (usuario.length !== 0) {
                const username = usuario[0]['username'];
                const correo = usuario[0]['correo'];
                if (username === data.username && correo) return { message: 'Correo electrónico y nombre de usuario ya existen' };
                if (correo) return { message: 'Correo electrónico ya existente' };
                if (username === data.username) return { message: 'Nombre de usuario ya existente' };
            }
            const hashedPassword = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            const [result] = await connection.query("CALL InsertUsuarioProfe(?, ?, ?, ?, ?, ?, ?);", [data.email, data.firstName, data.lastName_p, data.lastName_m, hashedPassword, "profe", data.username]);
            if (result.affectedRows === 2) return { message: 'Usuario creado correctamente', status: 'success' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async getById({ id }) {
        try {
            const [result] = await connection.query("SELECT usuario.id_usuario, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario.username, profesor.admin FROM usuario INNER JOIN profesor ON usuario.id_usuario = profesor.id_usuario WHERE usuario.id_usuario = ?;", [id]);
            if (result.length === 0) return []
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query("CALL Eliminar_Usuario_Profe(?);", [id]);
            return (result.affectedRows === 2) ? { message: 'Usuario eliminado correctamente' } : { message: 'Ha ocurrido un problema al intentar eliminar el usuario' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async update({ id, data }) {
        try {
            const { admin, ...user } = data;

            const message = {};

            if (admin === 1 || admin === 0) {
                const [result] = await connection.query("UPDATE profesor SET admin = ? WHERE id_usuario = ?;", [admin, id]);
                if (result.affectedRows === 1) message.profesor = 'Los datos de administración han sido actualizados';
            }

            if (Object.keys(user).length > 0) {
                const usuario = {
                    nombre: user.firstName,
                    apellido_p: user.lastName_p,
                    apellido_m: user.lastName_m
                };
                const filteredUsuario = Object.fromEntries(Object.entries(usuario).filter(([_, value]) => value !== undefined));
                const [result] = await connection.query("UPDATE usuario SET ? WHERE id_usuario = ?;", [filteredUsuario, id]);
                if (result.affectedRows === 1) message.usuario = 'Los datos del usuario han sido actualizados';
            }

            return message;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
