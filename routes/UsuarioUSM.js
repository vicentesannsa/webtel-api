import { Router } from 'express';
import { UsuarioUSMController } from '../controllers/UsuarioUSM.js';
import { verifyAuth } from '../middlewares/verifyAuth.js';

export const createUsuarioUSMRouter = ({ UsuarioUSMModel }) => {
    const UsuarioUSMRouter = Router();

    const UsuarioUSMControllerInstance = new UsuarioUSMController({ UsuarioUSMModel });

    UsuarioUSMRouter.use(verifyAuth);
    UsuarioUSMRouter.get('/', UsuarioUSMControllerInstance.getAll);
    UsuarioUSMRouter.post('/', UsuarioUSMControllerInstance.create);
    UsuarioUSMRouter.get('/:id', UsuarioUSMControllerInstance.getById);
    UsuarioUSMRouter.delete('/:id', UsuarioUSMControllerInstance.delete);
    UsuarioUSMRouter.patch('/:id', UsuarioUSMControllerInstance.update);

    return UsuarioUSMRouter;
};
