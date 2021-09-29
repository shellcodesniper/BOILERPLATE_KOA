import User from '@models/mysql/users/user.model';
import logger from '@logger';

import SITEINFO_BASIC_SERVICE from '@src/services/siteInfos/basicSiteInfo.service';
import ENCRYPT_UTIL from '@utils/encryptUtil';

import * as interfaces from './basic.service.interface';

const BASIC_USER_PLATFORM_TYPE = 'USER_PLATFORM_TYPE_BASIC';

namespace USER_BASIC_SERVICE {
  export async function createBasicUser(userData: interfaces.ICreateUser): Promise<boolean> {
    const siteInfo = await SITEINFO_BASIC_SERVICE.getSiteInfoById(userData.siteInfo);
    if (!siteInfo) return false;
    const user = new User();
    user.siteInfo = siteInfo;
    user.platformType = BASIC_USER_PLATFORM_TYPE;
    user.username = userData.username;
    user.email = userData.email;

    const { hash, salt } = ENCRYPT_UTIL.Encrypt(userData.password);
    user.hash = hash;
    user.salt = salt;
    user.nickname = userData.nickname;
    user.pn = userData.pn;
    user.lastLogin = new Date();
    user.lastActivity = new Date();

    user.profileText = userData.profileText;
    user.score = 0.00;
    user.point = 0;

    user.isActive = true;
    try {
      await user.save();
      return true;
    } catch (err) {
      logger.error('Error On createBasicUser');
      logger.error(err);
    }

    return false;
  }

  export async function getAllUser(): Promise<Array<User> | undefined> {
    try {
      const tempUser = await User.createQueryBuilder('user')
        .select(['user.id', 'user.siteInfoId', 'user.platformType', 'user.username', 'user.email', 'user.nickname', 'user.pn', 'user.lastLogin', 'user.lastActivity', 'user.pn', 'user.profileText', 'user.score', 'user.point', 'user.isActive'])
        .getMany();
      if (tempUser.length > 0) {
        return tempUser as Array<User>;
      }
    } catch (err) {
      logger.error('Error On getAllUser');
      logger.error(err);
    }
    return undefined;
  }

  export async function getUserById(id: number): Promise<User | undefined> {
    try {
      const user = await User.findOne(id);
      return user || undefined;
    } catch (err) {
      logger.error('Error On getUserById');
      logger.error(err);
    }
    return undefined;
  }

  export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await User.findOne({ email });
      if (user) return user;
    } catch (err) {
      logger.error('Error On GetUserByEmail');
      logger.error(err);
    }
    return undefined;
  }

  export async function getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await User.findOne({ username });
      if (user) return user;
    } catch (err) {
      logger.error('Error On GetUserByUserName');
      logger.error(err);
    }
    return undefined;
  }

  export async function isExists(id: number): Promise<boolean> {
    try {
      const userCount = await User.count({ id });
      return (userCount > 0);
    } catch (err) {
      logger.error('Error On User isExists');
      logger.error(err);
    }
    return false;
  }
}

export default USER_BASIC_SERVICE;
