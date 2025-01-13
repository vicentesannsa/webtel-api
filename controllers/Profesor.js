import { validatePartialProfesor, validateProfesor } from '../schemas/Profesor.js';

export class ProfesorController {
    constructor({ ProfesorModel }) {
        this.ProfesorModel = ProfesorModel;
    }

    getAll = async (request, response) => {
        try {
            const { current_page, per_page } = request.query;
            const profesor = await this.ProfesorModel.getAll({ current_page, per_page });
            response.json(profesor);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    create = async (request, response) => {
        try {
            const result = validateProfesor(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const message = await this.ProfesorModel.create({ data: result.data });
            response.status((message.status) ? 201 : 409).json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    getById = async (request, response) => {
        try {
            const { id } = request.params;
            const profesor = await this.ProfesorModel.getById({ id });
            response.json(profesor);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    delete = async (request, response) => {
        try {
            const { id } = request.params;
            const message = await this.ProfesorModel.delete({ id });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    update = async (request, response) => {
        try {
            const result = validatePartialProfesor(request.body);
            if (result.error) return response.status(422).json({ error: JSON.parse(result.error.message)[0].code });
            const { id } = request.params;
            const message = await this.ProfesorModel.update({ id, data: result.data });
            response.json(message);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
