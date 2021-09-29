import User from '@models/mysql/users/user.model';
import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';

export interface IRegisterPost {
  writerId: User['id'],
  siteInfoId: SiteInfo['id'],
  type: string,
  title: string,
  description: string,
  attachList: Array<string>,
}
