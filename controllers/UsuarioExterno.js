import { validatePartialUsuarioExterno, validateUsuarioExterno } from '../schemas/UsuarioExterno.js';

export class UsuarioExternoController {
    constructor({ UsuarioExternoModel }) {
        this.UsuarioExternoModel = UsuarioExternoModel;
    }

    getAll = async (request, response) => {
        try {
            const { current_page, per_page } = request.query;
            const usuario_externo = await this.UsuarioExternoModel.getAll({ current_page, per_page });
            response.json(usuario_externo);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    create = async (request, response) => {
        try {
            const result = validateUsuarioExterno(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const message = await this.UsuarioExternoModel.create({ data: result.data });
            response.status((message.status) ? 201 : 409).json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    getById = async (request, response) => {
        try {
            const { id } = request.params;
            const usuario_externo = await this.UsuarioExternoModel.getById({ id });
            response.json(usuario_externo);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    delete = async (request, response) => {
        try {
            const { id } = request.params;
            const message = await this.UsuarioExternoModel.delete({ id });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    update = async (request, response) => {
        try {
            const result = validatePartialUsuarioExterno(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const { id } = request.params;
            const message = await this.UsuarioExternoModel.update({ id, data: result.data });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
