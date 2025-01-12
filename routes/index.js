import { Router } from 'express';
import { createUsuarioEmpresaRouter } from './UsuarioEmpresa.js';
import { createUsuarioExternoRouter } from './UsuarioExterno.js';
import { createUsuarioRouter } from './Usuario.js';
import { createUsuarioUSMRouter } from './UsuarioUSM.js';

export const createRouter = ({ Model }) => {
    const router = Router();

    router.use('/usuario', createUsuarioRouter({ UsuarioModel: Model.Usuario }));

    router.use('/usuario_empresa', createUsuarioEmpresaRouter({ UsuarioEmpresaModel: Model.UsuarioEmpresa }));

    router.use('/usuario_externo', createUsuarioExternoRouter({ UsuarioExternoModel: Model.UsuarioExterno }));

    router.use('/usuario_usm', createUsuarioUSMRouter({ UsuarioUSMModel: Model.UsuarioUSM }));

    return router;
};
