import { verifyAuth } from '../middlewares/verifyAuth.js';
import { Router } from 'express';
import { ProfesorController } from '../controllers/Profesor.js';

export const createProfesorRouter = ({ ProfesorModel }) => {
    const ProfesorRouter = Router();

    const ProfesorControllerInstance = new ProfesorController({ ProfesorModel });

    ProfesorRouter.use(verifyAuth);
    ProfesorRouter.get('/', ProfesorControllerInstance.getAll);
    ProfesorRouter.post('/', ProfesorControllerInstance.create);
    ProfesorRouter.get('/:id', ProfesorControllerInstance.getById);
    ProfesorRouter.delete('/:id', ProfesorControllerInstance.delete);
    ProfesorRouter.patch('/:id', ProfesorControllerInstance.update);

    return ProfesorRouter;
};
