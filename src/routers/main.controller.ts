import { ctxType } from '@src/@types/types';
import COMMON_UTIL from '@utils/commonUtil';

import packageData from '@root/package.json';

namespace MAIN_CONTROLLER {
  export async function getCurrentVersionAction(ctx: ctxType): Promise<void> {
    const level: string = (process.env.SERVICE_LEVEL || 'NO LEVEL');
    const { version } = packageData;
    const retData: Record<string, string> = {
      level, version,
    };
    return COMMON_UTIL.successResult(ctx, retData);
  }

  export async function getClientIpAction(ctx: ctxType): Promise<void> {
    ctx.body = `${ctx.req.headers['x-forwarded-for'] || ctx.request.ip}`;
  }
}

export default MAIN_CONTROLLER;
