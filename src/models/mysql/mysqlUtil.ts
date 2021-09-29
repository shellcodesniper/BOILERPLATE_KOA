import { getConnection, Connection, createConnection } from 'typeorm';
import logger from '@logger';

namespace MYSQL_UTIL {
  export async function initialize(): Promise<boolean> {
    try {
      // const conn = await createConnection({
      const conn = await createConnection({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || '3306', 10),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        entities: ['src/models/mysql/**/*.model.ts'],
        logging: 'all',
        logger: 'advanced-console',
        // NOTE 로깅 옵션
      });

      // NOTE catch 에서 안잡히는 로그 확인용
      // .then((conn: Connection) => {
      //   logger.info(conn);
      // })
      // .catch((err: any) => {
      //   console.error(err);
      // });

      logger.info(`MYSQL READY? : ${conn.isConnected}`);

      // NOTE 디비 마이그레이션 ( 강제 동기화 시킴 )
      // await conn.synchronize(true);
      // NOTE : 모든 컬럼 테이블 날리기 & 재생성
    } catch (err) {
      logger.error('error On Mysql Init');
      logger.error(JSON.stringify(err));
    }
    return true;
  }
  export function getConn(name: string): Connection {
    return getConnection(name);
  }
}

export default MYSQL_UTIL;
