import Router from 'koa-router';
import AUTH_MIDDLEWARE from '@src/middlewares/auth.middleware';

import USER_CONTROLLER from './user.controller';
import USER_SPECIFIED_ROUTER from './idRouter/router';

const router = new Router();

router.get('/', AUTH_MIDDLEWARE.verifyToken, USER_CONTROLLER.getAllUserAction);
router.post('/', USER_CONTROLLER.basicRegisterAction);
router.post('/login', USER_CONTROLLER.basicLoginAction);
// router.get('/social')

router.use('/:userId/', USER_SPECIFIED_ROUTER.routes());

export default router;
