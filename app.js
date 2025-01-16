import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import { corsMiddleware } from './middlewares/cors.js';
import { createRouter } from './routes/index.js';
import { session } from './middlewares/session.js';
import { PORT } from './config.js';

export const createApp = ({ Model }) => {
    const app = express();

    app.disable('x-powered-by');

    app.use(express.json());

    app.use(cookieParser());

    app.use(corsMiddleware());

    app.use(session);

    app.use(logger('dev'));

    app.use('/', createRouter({ Model }));

    const port = PORT ?? 1234;
    app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
};
