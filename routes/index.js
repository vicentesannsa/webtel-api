import { Router } from 'express';
import { createUsuarioRouter } from './Usuario.js';
import { createUsuarioUSMRouter } from './UsuarioUSM.js';

export const createRouter = ({ Model }) => {
    const router = Router();

    router.use('/usuario', createUsuarioRouter({ UsuarioModel: Model.Usuario }));

    router.use('/usuario_usm', createUsuarioUSMRouter({ UsuarioUSMModel: Model.UsuarioUSM }));

    return router;
};
