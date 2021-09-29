import koaLog from 'koa-logger';
import { Logger } from 'winston';

import { getMongoLogger } from './customs/mongo.transport';

// NOTE LOG4JS 가 앱 전반 로그 전체를 담당

export const logger: Logger = getMongoLogger();

function customFormating(str: string, args: any): string {
  return [...args].reduce((pattern, value) => pattern.replace(/%s/, value), str);
}

export const koaLogger = koaLog((str, args: any) => {
  const formatted = customFormating(str, args);
  console.log(formatted);
});

export default logger;
