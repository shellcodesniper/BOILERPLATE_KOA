import logger from '@logger';

export async function burnUp(): Promise<boolean> {
  logger.info('Burning up...');
  return true;
}

export default {};
