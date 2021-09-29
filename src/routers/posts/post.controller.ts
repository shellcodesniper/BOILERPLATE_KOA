import COMMON_UTIL from '@utils/commonUtil';
import { ctxType } from '@src/@types/types';
import User from '@models/mysql/users/user.model';

import POST_BASIC_SERVICE from '@services/posts/postBasic.service';

namespace POST_CONTROLLER {
  export async function getAllPostAction(ctx: ctxType): Promise<void> {
    // TODO  pagination 추가, filter 추가
    const posts = await POST_BASIC_SERVICE.getAllPost();
    if (posts && posts.length > 0) return COMMON_UTIL.successResult(ctx, { posts });
    return COMMON_UTIL.errorResult(ctx, '등록된 글이 없거나, 글을 가져오는데, 에러 발생하였습니다.');
  }

  export async function createPostAction(ctx: ctxType): Promise<void> {
    const required = ['type', 'title', 'description', 'attaches'];
    const [success, lackKeys] = COMMON_UTIL.objectHaveKeys(ctx.req.body, required);
    if (!success) return COMMON_UTIL.lackKeyResult(ctx, lackKeys);

    if (!ctx.decoded || !ctx.decoded.user) return COMMON_UTIL.errorResult(ctx, '잘못된 요청입니다.');

    const { user } = ctx.decoded;

    const { siteInfo } = user as User;

    const {
      type, title, description, attaches,
    } = ctx.req.body;

    // NOTE DELIMITER

    const createResult = await POST_BASIC_SERVICE.createPost({
      type,
      title,
      description,
      attachList: (attaches as Array<string>),
      siteInfoId: (siteInfo as unknown as number),
      writerId: user.id,
    });
    console.log(createResult);

    return COMMON_UTIL.successResult(ctx);
  }

  // export async function updatePostAction(ctx: ctxType): Promise<void> {

  // }

  // export async function deletePostAction(ctx: ctxType): Promise<void> {

  // }
}

export default POST_CONTROLLER;
