import SiteInfo from '@models/mysql/siteInfos/siteInfo.model';
import logger from '@logger';

namespace SITEINFO_BASIC_SERVICE {
  export async function getSiteInfoById(id: number): Promise<SiteInfo | undefined> {
    try {
      const siteInfo = await SiteInfo.findOne(id);
      if (siteInfo) return siteInfo;
    } catch (err) {
      logger.error(err);
    }
    return undefined;
  }
}

export default SITEINFO_BASIC_SERVICE;
