import { Router } from 'express';
import { UsersController } from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import UploadConfig from '@config/upload';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(UploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create
);

usersRouter.delete(
    '/:email',
    celebrate({
        [Segments.PARAMS]: {
            email: Joi.string().required()
        }
    }),
    usersController.delete
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
);

export { usersRouter };
