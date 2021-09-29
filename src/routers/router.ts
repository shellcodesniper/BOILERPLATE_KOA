import Router from 'koa-router';
import MAIN_CONTROLLER from './main.controller';

import USER_ROUTER from './users/router';
import POST_ROUTER from './posts/router';

const router = new Router();

router.get('/', MAIN_CONTROLLER.getCurrentVersionAction);
router.get('/ip', MAIN_CONTROLLER.getClientIpAction);
// ? 메인 라우터

router.use('users', USER_ROUTER.routes());
router.use('posts', POST_ROUTER.routes());

export default router;
