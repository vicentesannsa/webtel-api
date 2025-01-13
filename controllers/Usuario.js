import jwt from 'jsonwebtoken';
import { validateUsuario } from '../schemas/Usuario.js';

export class UsuarioController {
    constructor({ UsuarioModel }) {
        this.UsuarioModel = UsuarioModel;
    }

    login = async (request, response) => {
        try {
            const result = validateUsuario(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message) });
            const usuario = await this.UsuarioModel.login({ credentials: result.data });
            const token = jwt.sign({ usuario }, process.env.SECRET_JWT_KEY, { expiresIn: '1h' });
            response.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 60 });
            response.status(202).json(usuario);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    logout = async (request, response) => {
        try {
            response.clearCookie('access_token');
            response.json({ message: 'Cierre de sesión exitoso' })
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    time = async (request, response) => {
        try {
            const time = await this.UsuarioModel.time();
            response.json(time)
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
