import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionsController.create
);

export { sessionsRouter };
