import { Router } from 'express';
import { UsuarioController } from '../controllers/Usuario.js';

export const createUsuarioRouter = ({ UsuarioModel }) => {
    const UsuarioRouter = Router();

    const UsuarioControllerInstance = new UsuarioController({ UsuarioModel });

    UsuarioRouter.post('/login', UsuarioControllerInstance.login);
    UsuarioRouter.post('/logout', UsuarioControllerInstance.logout);

    return UsuarioRouter;
};
