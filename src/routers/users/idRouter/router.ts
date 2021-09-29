import Router from 'koa-router';
import AUTH_MIDDLEWARE from '@src/middlewares/auth.middleware';

import USER_SPECIFIED_CONTROLLER from './idUser.controller';

const router = new Router();

router.get('/', AUTH_MIDDLEWARE.verifyToken, USER_SPECIFIED_CONTROLLER.getSpecificUserAction);

export default router;
