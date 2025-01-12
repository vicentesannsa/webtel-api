import jwt from 'jsonwebtoken';

export const session = (request, response, next) => {
    const token = request.cookies.access_token;
    request.session = { user: null };

    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        request.session.user = data;
    } catch {}

    next();
};
