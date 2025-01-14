import { ComentarioModel } from './Comentario.js';
import { ProfesorModel } from './Profesor.js';
import { UsuarioModel } from './Usuario.js';
import { UsuarioEmpresaModel } from './UsuarioEmpresa.js';
import { UsuarioExternoModel } from './UsuarioExterno.js';
import { UsuarioUSMModel } from './UsuarioUSM.js';

const MySQLModel = {
    Comentario: ComentarioModel,
    Profesor: ProfesorModel,
    Usuario: UsuarioModel,
    UsuarioEmpresa: UsuarioEmpresaModel,
    UsuarioExterno: UsuarioExternoModel,
    UsuarioUSM: UsuarioUSMModel,
};

export default MySQLModel;
