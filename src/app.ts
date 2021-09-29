import Koa from 'koa';
import Router from 'koa-router';

import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';

import logger, { koaLogger } from '@logger';

import indexRouter from '@router/router';
import KOA_MIDDLEWARE from './middlewares/koa.middleware';

const app:Koa = new Koa();
const staticDirPath = path.join(__dirname, '..', 'public');
const port: number = parseInt(`${process.env.PORT || '3000'}`, 10) || 3000;

app.use(KOA_MIDDLEWARE.Cors);
app.use(KOA_MIDDLEWARE.cookieParser);
app.use(KOA_MIDDLEWARE.Compression);
app.use(koaLogger);
app.use(mount('/static', serve(staticDirPath)));

const appRouter = new Router();

appRouter.use('/', KOA_MIDDLEWARE.koaBodyParser, indexRouter.routes());

app.use(appRouter.routes())
  .use(appRouter.allowedMethods());

app.listen(port, (): void => {
  logger.info(`SERVER STARTED ON ${port}`);
});

export default app;
