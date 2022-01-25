import { productsRouter } from '@module/products/routes/products.routes';
import { usersRouter } from '@module/users/routes/users.routes';
import { sessionsRouter } from '@module/users/routes/session.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);

export { routes };
