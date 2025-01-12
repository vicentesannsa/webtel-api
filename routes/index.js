import { Router } from 'express';
import { createUsuarioUSMRouter } from './UsuarioUSM.js';

export const createRouter = ({ Model }) => {
    const router = Router();

    router.use('/usuario_usm', createUsuarioUSMRouter({ UsuarioUSMModel: Model.UsuarioUSM }));

    return router;
};
