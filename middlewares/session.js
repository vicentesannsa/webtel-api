import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

export const session = (request, response, next) => {
    const token = request.cookies.access_token;
    request.session = { user: null };

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY);
        request.session.user = data;
    } catch {}

    next();
};
