import { validatePartialUsuarioUSM, validateUsuarioUSM } from '../schemas/UsuarioUSM.js';

export class UsuarioUSMController {
    constructor({ UsuarioUSMModel }) {
        this.UsuarioUSMModel = UsuarioUSMModel;
    }

    getAll = async (request, response) => {
        try {
            const { current_page, per_page } = request.query;
            const usuario_usm = await this.UsuarioUSMModel.getAll({ current_page, per_page });
            response.json(usuario_usm);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    create = async (request, response) => {
        try {
            const result = validateUsuarioUSM(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const message = await this.UsuarioUSMModel.create({ data: result.data });
            response.status((message.status) ? 201 : 409).json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    getById = async (request, response) => {
        try {
            const { id } = request.params;
            const usuario_usm = await this.UsuarioUSMModel.getById({ id });
            response.json(usuario_usm);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    delete = async (request, response) => {
        try {
            const { id } = request.params;
            const message = await this.UsuarioUSMModel.delete({ id });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    update = async (request, response) => {
        try {
            const result = validatePartialUsuarioUSM(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const { id } = request.params;
            const message = await this.UsuarioUSMModel.update({ id, data: result.data });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
