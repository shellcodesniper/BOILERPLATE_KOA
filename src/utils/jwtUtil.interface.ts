import User from '@src/models/mysql/users/user.model';
import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';

export interface IJwtData {
  id: User['id'];
  siteInfo: SiteInfo['id'];
  username: User['username'];
  user?: User | null;
}

export interface IJwtRet {
  success: boolean;
  data?: IJwtData;
  code?: number;
  message?: string;
}
