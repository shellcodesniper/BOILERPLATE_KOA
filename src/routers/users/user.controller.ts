import { ctxType } from '@src/@types/types';
import COMMON_UTIL from '@utils/commonUtil';

import USER_BASIC_SERVICE from '@services/users/basicUser.service';
import { ICreateUser } from '@services/users/basic.service.interface';
import ENCRYPT_UTIL from '@src/utils/encryptUtil';
import JWT_UTIL from '@src/utils/jwtUtil';

namespace USER_CONTROLLER {
  export async function getAllUserAction(ctx: ctxType): Promise<void> {
    const users = await USER_BASIC_SERVICE.getAllUser();
    if (users === undefined) return COMMON_UTIL.errorResult(ctx, 'No User Yet', 404);
    return COMMON_UTIL.successResult(ctx, { users });
  }

  //  * Register * //
  export async function basicRegisterAction(ctx: ctxType): Promise<void> {
    const requiredKeys = ['siteInfo', 'username', 'email', 'password', 'pn', 'nickname', 'profileText'];
    const [success, lackKeys] = COMMON_UTIL.objectHaveKeys(ctx.request.body, requiredKeys);
    if (!success) COMMON_UTIL.lackKeyResult(ctx, lackKeys);
    const {
      siteInfo, username,
      email, password, pn,
      nickname, profileText,
    } = ctx.req.body;

    const collectedData: ICreateUser = {
      siteInfo,
      username,
      email,
      password,
      pn,
      nickname,
      profileText,
    };

    // TODO 사용자 이메일 / 아이디 중복 확인 / 닉네임 중복 확인!

    const createResult = await USER_BASIC_SERVICE.createBasicUser(collectedData);
    if (createResult) return COMMON_UTIL.successResult(ctx, {}, '사용자 생성 완료.');
    return COMMON_UTIL.errorResult(ctx, '사용자 생성에 실패하였습니다.');
  }

  // export async function socialRegisterAction(ctx: ctxType): Promise<void> {

  // }

  // * LOGIN * //

  export async function basicLoginAction(ctx: ctxType): Promise<void> {
    const requiredKeys = ['password'];
    const conditionalKeys = [['email', 'username']];
    const [
      success, lackKeys,
    ] = COMMON_UTIL.objectHaveKeys(ctx.req.body, requiredKeys, conditionalKeys);
    if (!success) return COMMON_UTIL.lackKeyResult(ctx, lackKeys);
    const { password } = ctx.req.body;

    const loginKey = ctx.req.body.email ? 'email' : 'username';
    const loginValue = ctx.req.body[loginKey] as string;

    const user = loginKey === 'email' ? await USER_BASIC_SERVICE.getUserByEmail(loginValue) : await USER_BASIC_SERVICE.getUserByUsername(loginValue);
    if (user) {
      const { hash, salt } = user;
      const result = ENCRYPT_UTIL.Verify(password, hash, salt);
      if (result) {
        const { id, username, siteInfo } = user;
        const token = JWT_UTIL.sign({
          id,
          username,
          siteInfo: (siteInfo as unknown as number),
        });
        return COMMON_UTIL.successResult(ctx, { token });
      }
    }
    return COMMON_UTIL.errorResult(ctx, '아이디 혹은 비밀번호를 확인하세요.');
  }
  // export async function socialLoginAction(ctx: ctxType): Promise<void> {

  // }
}

export default USER_CONTROLLER;
