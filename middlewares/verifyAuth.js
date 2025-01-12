export const verifyAuth = (request, response, next) => {
    const { user } = request.session;
    if (!user || user["usuario"][0].tipo_usuario !== "profe" || user["usuario"][0].admin !== 1) return response.status(403).json({ message: 'Acceso no autorizado' });
    console.log('Sesión:', user["usuario"][0].username);
    next();
};
