import Post, { IPost } from '@models/mongodb/posts/post.model';
import PostMapper from '@models/mysql/posts/postMapper.model';
import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';
import User from '@models/mysql/users/user.model';

import logger from '@logger';
import * as interfaces from './postBasic.service.interface';

namespace POST_BASIC_SERVICE {
  export async function getAllPost(): Promise<IPost[] | undefined> {
    try {
      const posts = await Post.find();
      if (posts) {
        const postDocs: IPost[] = (posts.map((post) => (post._doc as IPost)));
        return postDocs;
      }
    } catch (err) {
      logger.error(err);
    }
    return undefined;
  }

  export async function createPost(data: interfaces.IRegisterPost): Promise<boolean> {
    const newPost = new Post();

    newPost.writerId = data.writerId;
    newPost.siteInfoId = data.siteInfoId;
    newPost.title = data.title;
    newPost.type = data.type;
    newPost.description = data.description;
    newPost.attachList = data.attachList;
    newPost.memo = '';

    try {
      await newPost.save();
      const postId =  newPost._id.toString();
      const postmap = new PostMapper();
      const siteInfoTemp = await SiteInfo.findOne(data.siteInfoId);
      const writerTemp = await User.findOne(data.writerId);
      if (!siteInfoTemp || !writerTemp) {
        newPost.remove();
        return false;
        // NOTE  중간에 빠져나오니, return
      }
      postmap.postId = postId;
      postmap.siteInfo = siteInfoTemp;
      postmap.writer = writerTemp;
      postmap.likeCount = 0;
      postmap.bookmarkCount = 0;
      postmap.commentCount = 0;
      postmap.likeCount = 0;
      try {
        await postmap.save();
        return true;
      } catch (err) {
        logger.error('Error On Postmap Saving');
      }
    } catch (err) {
      logger.error('Error On CreatePost');
      logger.error(err);
    }

    return false;
  }
}

export default POST_BASIC_SERVICE;
