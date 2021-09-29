import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';

export interface ICreateUser {
  siteInfo: SiteInfo['id'],
  username: string;
  email: string;
  password: string;
  nickname: string;
  pn: string;
  profileText: string;
}
