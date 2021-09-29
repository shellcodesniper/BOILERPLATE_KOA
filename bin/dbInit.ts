import MONGO_UTIL from '@models/mongodb/mongoUtil';
import MYSQL_UTIL from '@models/mysql/mysqlUtil';
import logger from '@logger';

export default async function dbInit(): Promise<void> {
  logger.debug('Initializing DATABASE');
  const result = (await MYSQL_UTIL.initialize() && await MONGO_UTIL.initialize());
  if (result) logger.info('DATABASE 준비 완료');
  else logger.error('DATABASE 로딩 실패');
}
