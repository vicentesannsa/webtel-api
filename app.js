import express from 'express';
import logger from 'morgan';
import { corsMiddleware } from './middlewares/cors.js';
import { createRouter } from './routes/index.js';

export const createApp = ({ Model }) => {
    const app = express();

    app.disable('x-powered-by');

    app.use(express.json());

    app.use(corsMiddleware());

    app.use('/', createRouter({ Model }));

    app.use(logger('dev'));

    const PORT = process.env.PORT ?? 1234;
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
};
