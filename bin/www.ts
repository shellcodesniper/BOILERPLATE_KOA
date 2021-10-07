#!/usr/bin/env node

import logger from '@logger';
import dotenv from 'dotenv';
import path from 'path';
import { burnUp } from '@src/burnUp';
import { configInit } from './configInit';

import dbInit from './dbInit';

const isProduction = (!((process.env.NODE_ENV || 'development') === 'development'));
const envPath = path.join('./configs', (isProduction ? '.env' : '.env.dev'));
dotenv.config({ path: envPath });

process.env.TZ = 'Asia/Seoul';
// ! SET TIMEZONE

// eslint-disable-next-line no-console
console.log('Logger Initialized');

if (isProduction) {
  process
    .on('uncaughtException', async (err) => {
      logger.error('error On uncaughtException');
      logger.error(JSON.stringify(err));
    })
    .on('unhandledRejection', async (reason, p) => {
      logger.error('error On unhandleRejection');
      const errorMessage = `REASON:\n\n${reason}\n\n\n\nPROMISE: \n\n${JSON.stringify(p)}`;
      logger.error(JSON.stringify(errorMessage));
      // eslint-disable-next-line max-len
      // EMAIL_UTIL.justsendMail('shellcodesniper@gmail.com', 'MULTITOOL UNHANDLE Rejection', errorMessage);
    });
}
// ! Production 환경일경우, 메일을통해 에러 메세지 보내기

// NOTE 모듈 외에서 익명함수로 async await 사용을 위함
(async () => {
  await dbInit();
  logger.info('모든 DATABASE가 준비완료되었습니다. 서버를 시작합니다.');

  await configInit();
  await burnUp();
  // eslint-disable-next-line global-require
  require('@src/app');
  // ! DATABASE 실행 완료한경우, 앱실행
})();
