import bcrypt from 'bcrypt';
import connection from '../../libs/connection.js';

export class UsuarioUSMModel {
    static async getAll({ current_page, per_page }) {
        try {
            const [result] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_usm.rol, usuario_usm.sede FROM usuario INNER JOIN usuario_usm ON usuario.id_usuario = usuario_usm.id_usuario;");
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
            const [usuario_usm] = await connection.query("SELECT rol FROM usuario_usm WHERE rol = ?;", [data.rol]);
            if (usuario_usm.length !== 0) {
                const rol = usuario_usm[0]['rol'];
                if (rol) return { message: 'Rol de alumno ya existente' };
            }
            const hashedPassword = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            const [result] = await connection.query("CALL InsertUsuarioUSM(?, ?, ?, ?, ?, ?, ?, ?, ?);", [data.email, data.firstName, data.lastName_p, data.lastName_m, hashedPassword, "usm", data.rol, data.sede, data.username]);
            if (result.affectedRows === 3) return { message: 'Usuario creado correctamente' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async getById({ id }) {
        try {
            const [result] = await connection.query(`SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_usm.rol, usuario_usm.sede FROM usuario INNER JOIN usuario_usm ON usuario.id_usuario = usuario_usm.id_usuario WHERE usuario.id_usuario = ?;`, [id]);
            if (result.length === 0) return []
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query("CALL eliminar_usuario_usm(?);", [id]);
            return (result.affectedRows === 3) ? { message: 'Usuario eliminado correctamente' } : { message: 'Ha ocurrido un problema al intentar eliminar el usuario' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async update({ id, data }) {
        try {
            const { sede, ...user } = data;
            const message = {};
            const usuario = {
                nombre: user.firstName,
                apellido_p: user.lastName_p,
                apellido_m: user.lastName_m
            };

            if (sede) {
                const [result] = await connection.query("UPDATE usuario_usm SET sede = ? WHERE id_usuario = ?;", [sede, id]);
                if (result.affectedRows === 1) message.sede = 'El campus del alumno ha sido actualizado';
            }

            if (user) {
                const [result] = await connection.query("UPDATE usuario SET ? WHERE id_usuario = ?;", [usuario, id]);
                if (result.affectedRows === 1) message.user = 'Los datos del alumno han sido actualizados';
            }

            return message;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
