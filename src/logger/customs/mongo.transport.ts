// TODO mongo Transport
import Transport from 'winston-transport';
import winston from 'winston';
import { consoleFormat } from './formatter';

const {
  combine, timestamp, label,
} = winston.format;

class MongoTransport extends Transport {
  // constructor(opts: Transport.TransportStreamOptions) {
  //   super(opts);
  // }
  log(info: any, callback: () => void): void {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // const message = info[Symbol.for('message')];
    // console.log(message);
    // TODO 여기서 메세지 처리를 하는 부분 추가하기
    callback();
  }
}

// mongoLogger 가져오기
export function getMongoLogger(): winston.Logger {
  return winston.createLogger({
    format: combine(
      winston.format.colorize(),
      label({ label: 'default' }),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: combine(
          winston.format.colorize(),
          label({ label: 'API' }),
          timestamp(),
          consoleFormat,
        ),
      }),
      new MongoTransport({
        level: 'info',
        format: combine(
          winston.format.colorize(),
          label({ label: 'API' }),
          timestamp(),
          consoleFormat,
        ),
      }),
    ],
  });
}

export default {};
