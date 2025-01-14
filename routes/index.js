import { Router } from 'express';
import { createProfesorRouter } from './Profesor.js';
import { createUsuarioEmpresaRouter } from './UsuarioEmpresa.js';
import { createUsuarioExternoRouter } from './UsuarioExterno.js';
import { createUsuarioRouter } from './Usuario.js';
import { createUsuarioUSMRouter } from './UsuarioUSM.js';
import { createComentarioRouter } from './Comentario.js';

export const createRouter = ({ Model }) => {
    const router = Router();

    router.use('/comentario', createComentarioRouter({ComentarioModel: Model.Comentario}));

    router.use('/profesor', createProfesorRouter({ ProfesorModel: Model.Profesor }));

    router.use('/usuario', createUsuarioRouter({ UsuarioModel: Model.Usuario }));

    router.use('/usuario_empresa', createUsuarioEmpresaRouter({ UsuarioEmpresaModel: Model.UsuarioEmpresa }));

    router.use('/usuario_externo', createUsuarioExternoRouter({ UsuarioExternoModel: Model.UsuarioExterno }));

    router.use('/usuario_usm', createUsuarioUSMRouter({ UsuarioUSMModel: Model.UsuarioUSM }));

    return router;
};
