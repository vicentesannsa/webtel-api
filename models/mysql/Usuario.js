import bcrypt from 'bcrypt';
import connection from '../../libs/connection.js';

export class UsuarioModel {
    static async login({ credentials }) {
        try {
            let user;
            const { email, password } = credentials;
            const [verification] = await connection.query("SELECT contrasena, tipo_usuario FROM usuario WHERE correo = ?;", [email]);
            if (verification.length === 0) return { message: 'El correo electrónico o la contraseña proporcionados son incorrectos' };
            const storedHash = verification[0].contrasena;
            const tipo_usuario = verification[0].tipo_usuario;
            const match = await bcrypt.compare(password, storedHash);
            if (!match) return { message: 'El correo electrónico o la contraseña proporcionados son incorrectos' };
            switch (tipo_usuario) {
                case 'usm':
                    [user] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_usm.rol, usuario_usm.sede FROM usuario INNER JOIN usuario_usm ON usuario.id_usuario = usuario_usm.id_usuario WHERE usuario.correo = ?;", [email]);
                    break;
                case 'empresa':
                    [user] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_empresa.rut, usuario_empresa.estudio, usuario_empresa.pais FROM usuario INNER JOIN usuario_empresa ON usuario.id_usuario = usuario_empresa.id_usuario WHERE usuario.correo = ?;", [email]);
                    break;
                case 'externo':
                    [user] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, usuario_externo.institucion, usuario_externo.nacimiento FROM usuario INNER JOIN usuario_externo ON usuario.id_usuario = usuario_externo.id_usuario WHERE usuario.correo = ?;", [email]);
                    break;
                case 'profe':
                    [user] = await connection.query("SELECT usuario.id_usuario, usuario.username, usuario.correo, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.tipo_usuario, profesor.admin FROM usuario INNER JOIN profesor ON usuario.id_usuario = profesor.id_usuario WHERE usuario.correo = ?;", [email]);
                    break;
                default:
                    break;
            }
            return user;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async time() {
        const [result] = await connection.query("SELECT NOW();");
        return result[0]['NOW()'];
    }
}
