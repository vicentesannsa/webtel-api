import { Router } from 'express';
import { ComentarioController } from '../controllers/Comentario.js';

export const createComentarioRouter = ({ ComentarioModel }) => {
    const ComentarioRouter = Router();

    const ComentarioControllerInstance = new ComentarioController({ ComentarioModel });

    ComentarioRouter.get('/', ComentarioControllerInstance.getAll);
    ComentarioRouter.post('/', ComentarioControllerInstance.create);
    ComentarioRouter.get('/:id', ComentarioControllerInstance.getById);

    return ComentarioRouter;
};