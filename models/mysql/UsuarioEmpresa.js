import bcrypt from 'bcrypt';
import connection from '../../libs/connection.js';

export class UsuarioEmpresaModel {
    static async getAll({ current_page, per_page }) {
        try {
            const [result] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_empresa.rut, usuario_empresa.estudio, usuario_empresa.pais FROM usuario INNER JOIN usuario_empresa ON usuario.id_usuario = usuario_empresa.id_usuario;");
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
            const [usuario_empresa] = await connection.query("SELECT rut FROM usuario_empresa WHERE rut = ?;", [data.rut]);
            if (usuario_empresa.length !== 0) {
                const rut = usuario_empresa[0]['rut'];
                if (rut) return { message: 'RUT ya existente' };
            }
            const hashedPassword = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            const [result] = await connection.query("CALL InsertUsuarioEmpresa(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [data.email, data.firstName, data.lastName_p, data.lastName_m, hashedPassword, "empresa", data.rut, data.study, data.country, data.username]);
            if (result.affectedRows === 3) return { message: 'Usuario creado correctamente', status: 'success' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async getById({ id }) {
        try {
            const [result] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_empresa.rut, usuario_empresa.estudio, usuario_empresa.pais FROM usuario INNER JOIN usuario_empresa ON usuario.id_usuario = usuario_empresa.id_usuario WHERE usuario.id_usuario = ?", [id]);
            if (result.length === 0) return []
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query("CALL Eliminar_Usuario_Empresa(?);", [id]);
            return (result.affectedRows === 3) ? { message: 'Usuario eliminado correctamente' } : { message: 'Ha ocurrido un problema al intentar eliminar el usuario' };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async update({ id, data }) {
        try {
            const { study, country, ...user } = data;

            const message = {};

            if (study || country) {
                const empresa = {
                    estudio: study,
                    pais: country,
                };
                const filteredEmpresa = Object.fromEntries(Object.entries(empresa).filter(([_, value]) => value !== undefined));
                const [result] = await connection.query("UPDATE usuario_empresa SET ? WHERE id_usuario = ?;", [filteredEmpresa, id]);
                if (result.affectedRows === 1) message.empresa = 'Los datos han sido actualizados';
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
