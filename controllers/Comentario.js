import { validateComentario } from '../schemas/Comentario.js';

export class ComentarioController {
    constructor({ ComentarioModel }) {
        this.ComentarioModel = ComentarioModel;
    }

    getAll = async (request, response) => {
        try {
            const { current_page, per_page } = request.query;
            const Comentario = await this.ComentarioModel.getAll({ current_page, per_page });
            response.json(Comentario);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    create = async (request, response) => {
        try {
            const result = validateComentario(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const message = await this.ComentarioModel.create({ data: result.data });
            response.status(201).json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    getById = async (request, response) => {
        try {
            const { id } = request.params;
            const Comentario = await this.ComentarioModel.getById({ id });
            response.json(Comentario);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
