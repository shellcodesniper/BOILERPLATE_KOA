import Router from 'koa-router';
import AUTH_MIDDLEWARE from '@src/middlewares/auth.middleware';

import POST_CONTROLLER from './post.controller';

const router = new Router();

router.get('/', AUTH_MIDDLEWARE.verifyToken, POST_CONTROLLER.getAllPostAction);
router.post('/', AUTH_MIDDLEWARE.verifyToken, POST_CONTROLLER.createPostAction);

export default router;
