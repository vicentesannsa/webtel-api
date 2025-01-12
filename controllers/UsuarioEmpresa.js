import { validatePartialUsuarioEmpresa, validateUsuarioEmpresa } from '../schemas/UsuarioEmpresa.js';

export class UsuarioEmpresaController {
    constructor({ UsuarioEmpresaModel }) {
        this.UsuarioEmpresaModel = UsuarioEmpresaModel;
    }

    getAll = async (request, response) => {
        try {
            const { current_page, per_page } = request.query;
            const usuario_empresa = await this.UsuarioEmpresaModel.getAll({ current_page, per_page });
            response.json(usuario_empresa);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    create = async (request, response) => {
        try {
            const result = validateUsuarioEmpresa(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const message = await this.UsuarioEmpresaModel.create({ data: result.data });
            response.status((message.status) ? 201 : 409).json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    getById = async (request, response) => {
        try {
            const { id } = request.params;
            const usuario_empresa = await this.UsuarioEmpresaModel.getById({ id });
            response.json(usuario_empresa);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    delete = async (request, response) => {
        try {
            const { id } = request.params;
            const message = await this.UsuarioEmpresaModel.delete({ id });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    update = async (request, response) => {
        try {
            const result = validatePartialUsuarioEmpresa(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const { id } = request.params;
            const message = await this.UsuarioEmpresaModel.update({ id, data: result.data });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
