export const verifyUserSession = (request, response, next) => {
    const { user } = request.session;
    if (!user) return response.status(403).json({ message: 'Acceso no autorizado' });
    console.log('Sesión:', user['usuario'][0].username, 'Tipo:', user['usuario'][0].tipo_usuario);
    next();
};
