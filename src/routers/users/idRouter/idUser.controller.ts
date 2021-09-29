import { ctxType } from '@src/@types/types';
import COMMON_UTIL from '@utils/commonUtil';

import USER_BASIC_SERVICE from '@services/users/basicUser.service';

namespace USER_SPECIFIED_CONTROLLER {
  export async function getSpecificUserAction(ctx: ctxType): Promise<void> {
    const id = parseInt((ctx.params.id.trim() as string || '-1'), 10) || -1;
    if (id < 0) return COMMON_UTIL.errorResult(ctx, '접근이 거부되었습니다.');

    const user = await USER_BASIC_SERVICE.getUserById(id);
    if (user) return COMMON_UTIL.successResult(ctx, { user });
    return COMMON_UTIL.errorResult(ctx, '해당 유저가 존재하지 않습니다.');
  }

  // export async function editUserInfoAction(ctx: ctxType): Promise<void> {

  // }

  // export async function deleteUserAction(ctx: ctxType): Promise<void> {

  // }

}

export default USER_SPECIFIED_CONTROLLER;
