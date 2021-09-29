import Koa from 'koa';
import expressCookieParser from 'cookie-parser';
import c2k from 'koa-connect';
import compress from 'koa-compress';
import zlib from 'zlib';
import { json } from 'express';
import koaBody from 'koa-body';
import { ctxType } from '@src/@types/types';
import logger from '@logger';

import { IConnectMiddleware } from './koa.middleware.interface';

const koaCompression = compress({
  threshold: 0,
  gzip: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  deflate: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
  br: {
    flush: zlib.constants.Z_SYNC_FLUSH,
  },
});
// ? compress option

const koaBodyParseOption: koaBody.IKoaBodyOptions = {
  patchNode: true,
  formLimit: '10mb',
  multipart: true,
  formidable: { multiples: false },
  includeUnparsed: true,
  onError: (err: any) => {
    logger.error('errorOn koaBodyParse');
    logger.error(err);
  },
};
// ? koabody 에 사용되는 parseOption

namespace KOA_MIDDLEWARE {
  export const bodyParser = c2k(json({ limit: '50mb' }));
  export const koaBodyParser = koaBody(koaBodyParseOption);
  export const cookieParser = c2k(expressCookieParser() as IConnectMiddleware);
  export const Compression = koaCompression;

  export async function Cors(ctx: ctxType, next: Koa.Next): Promise<void> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'accept, accept-language, accept-encoding, content-language, content-type, token, origin, referer, cookie, host, connection, x-requested-with, authorization');
    await next();
  }
}

export default KOA_MIDDLEWARE;
