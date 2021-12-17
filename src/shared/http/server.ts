import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes/index';
import { AppError } from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
