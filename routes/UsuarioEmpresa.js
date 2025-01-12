import { verifyAuth } from '../middlewares/verifyAuth.js';
import { Router } from 'express';
import { UsuarioEmpresaController } from '../controllers/UsuarioEmpresa.js';

export const createUsuarioEmpresaRouter = ({ UsuarioEmpresaModel }) => {
    const UsuarioEmpresaRouter = Router();

    const UsuarioEmpresaControllerInstance = new UsuarioEmpresaController({ UsuarioEmpresaModel });

    UsuarioEmpresaRouter.use(verifyAuth);
    UsuarioEmpresaRouter.get('/', UsuarioEmpresaControllerInstance.getAll);
    UsuarioEmpresaRouter.post('/', UsuarioEmpresaControllerInstance.create);
    UsuarioEmpresaRouter.get('/:id', UsuarioEmpresaControllerInstance.getById);
    UsuarioEmpresaRouter.delete('/:id', UsuarioEmpresaControllerInstance.delete);
    UsuarioEmpresaRouter.patch('/:id', UsuarioEmpresaControllerInstance.update);

    return UsuarioEmpresaRouter;
};
