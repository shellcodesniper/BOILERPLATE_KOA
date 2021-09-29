/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import winston from 'winston';

const {
  printf,
} = winston.format;

function convertPrettyKST(
  time: string | number | Date, simple?: boolean, hmsOnly?: boolean,
): string {
  const dateObj = new Date(time);
  const date = (`0${dateObj.getDate()}`).slice(-2);
  const month = (`0${(dateObj.getMonth() + 1)}`).slice(-2);
  const year = dateObj.getFullYear();
  const hour = (`0${dateObj.getHours()}`).slice(-2);
  const minute = (`0${dateObj.getMinutes()}`).slice(-2);
  const second = (`0${dateObj.getSeconds()}`).slice(-2);
  if (simple) {
    if (hmsOnly) return `${hour}:${minute}:${second}`;
    return `${year}${month}${date}_${hour}${minute}${second}`;
  }
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

export const consoleFormat = printf(({
  level, message, label, timestamp, ...rest
}) => {
  const prettyTime = convertPrettyKST(timestamp);
  let prettyMessage = '';
  try {
    prettyMessage = `\n${JSON.stringify(JSON.parse(message), undefined, 2)}`;
  } catch (err) {
    try {
      if (typeof (message) !== 'string') prettyMessage = `\n${JSON.stringify(message, undefined, 2)}`;
      else prettyMessage = message;
    } catch (err2) {
      prettyMessage = message;
    }
  }
  let restString = JSON.stringify(rest, undefined, '\t');
  restString = restString === '{}' ? '' : `\n${restString.replace(/\\n/gi, '\n')}`;
  return `CLUSTER: <${process.env.NODE_APP_INSTANCE || '0'}> (${label}) [ ${prettyTime} ] <${level}>: ${prettyMessage}${restString}`;
});

export default {};
