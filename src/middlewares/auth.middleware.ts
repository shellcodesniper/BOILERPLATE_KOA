import JWT_UTIL, { IJwtRet, IJwtData } from '@src/utils/jwtUtil';
import COMMON_UTIL from '@src/utils/commonUtil';
import { logger } from '@logger';

import Koa from 'koa';
import User from '@src/models/mysql/users/user.model';
import { ctxType } from '$types/types';

namespace AUTH_MIDDLEWARE {
  const verify = async (ctx: ctxType, token: string): Promise<IJwtRet> => {
    const ret: IJwtRet = JWT_UTIL.verify(token);
    if (ret.success) {
      const { data } = ret;
      ctx.decoded = data;
    }
    return ret;
  };

  export async function parseToken(ctx: ctxType): Promise<IJwtRet> {
    let reason: IJwtRet;
    if (ctx.req.headers.authorization) {
      const authToken = (ctx.req.headers.authorization as string);
      const token = authToken.includes('Bearear ') ? authToken.trim().split(' ')[1] as string : authToken.trim();
      reason = await verify(ctx, token);
    } else if (ctx.session && ctx.session.authorization) {
      const authToken = (ctx.session.authorization as string);
      const token = authToken.includes('Bearear ') ? authToken.trim().split(' ')[1] as string : authToken.trim();
      reason = await verify(ctx, token);
    } else {
      reason = { success: false, message: 'NO ANY TOKEN IN header / session / cookie' };
    }
    return reason;
  }

  export const verifyToken = async (ctx: ctxType, next: Koa.Next): Promise<void> => {
    const result = await parseToken(ctx);
    if (result.success === true) {
      if (ctx.decoded) {
        const decoded = ctx.decoded as IJwtData;
        if (await User.count({ id: decoded.id }) > 0) {
          // NOTE 여기서는 유저가 존재하는지 먼저 체크함
          logger.debug(`WELCOME, '${decoded.username}' `);
          ctx.decoded.user = await User.findOne(decoded.id);
          // NOTE 여기서는 찾아온 유저를 그냥 넣어줌
          return next();
        }
        return COMMON_UTIL.errorResult(ctx, 'NO VALID USER', 401);
      }
    }
    if (result.code) {
      if (result.code.toString() in JWT_UTIL.errorTable) {
        const simpleErrorMessage = JWT_UTIL.errorTable[result.code.toString()];
        return COMMON_UTIL.errorResult(ctx, `SIMPLE REASON: ${simpleErrorMessage}, REASON: ${result.message}`, 401);
      }
    } else {
      return COMMON_UTIL.errorResult(ctx, result.message, 401);
    }
    return COMMON_UTIL.errorResult(ctx, 'Unknown Error In Authorize');
  };

}

export default AUTH_MIDDLEWARE;
