import { verifyAuth } from '../middlewares/verifyAuth.js';
import { Router } from 'express';
import { UsuarioExternoController } from '../controllers/UsuarioExterno.js';

export const createUsuarioExternoRouter = ({ UsuarioExternoModel }) => {
    const UsuarioExternoRouter = Router();

    const UsuarioExternoControllerInstance = new UsuarioExternoController({ UsuarioExternoModel });

    UsuarioExternoRouter.use(verifyAuth);
    UsuarioExternoRouter.get('/', UsuarioExternoControllerInstance.getAll);
    UsuarioExternoRouter.post('/', UsuarioExternoControllerInstance.create);
    UsuarioExternoRouter.get('/:id', UsuarioExternoControllerInstance.getById);
    UsuarioExternoRouter.delete('/:id', UsuarioExternoControllerInstance.delete);
    UsuarioExternoRouter.patch('/:id', UsuarioExternoControllerInstance.update);

    return UsuarioExternoRouter;
};
