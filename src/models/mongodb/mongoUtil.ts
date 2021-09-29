import mongoose from 'mongoose';
import { logger } from '@logger';
import { IEnv } from '@root/bin/env.interface';

import { ImongoParsedError, IValidDocRet } from './mongoUtil.interface';

namespace MONGO_UTIL {
  export async function initialize(): Promise<boolean> {
    logger.info('INITIALIZE MONGO');

    const {
      MONGO_HOST, MONGO_USER,
      MONGO_PASS, MONGO_DB,
    } = process.env as unknown as IEnv;
    const connectUrl = `mongodb+srv://${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
    const connectOption: mongoose.ConnectOptions = {
      user: MONGO_USER,
      pass: MONGO_PASS,
      autoIndex: true,
      keepAlive: true,
    };

    await mongoose.connect(connectUrl, connectOption);
    return true;
  }
  export const mongoErrDict: { [id: string]: string } = {
    '-1': 'unknown Error',
    0: 'success',
    1: 'castError',
    2: 'array projection and then modified the array in an unsafe way',
    3: 'Document Not Found',
    4: 'models are not Registered Yet,',
    5: 'Model with Given Name Already Registered!!',
    6: 'save Called Multiple Time On Same Document!!',
    7: 'model is on struct mode.. must have no changes on immutable properties',
    8: 'validation Error Check errors param',
    9: 'validator Errors Check erros param',
  };

  export function mongoErrorParser(err: mongoose.Error | any): ImongoParsedError {
    let retCode = 0;
    if (err) {
      if (err instanceof mongoose.Error) {
        retCode = -1;
        if (err instanceof mongoose.Error.CastError) retCode = 1;
        else if (err instanceof mongoose.Error.DivergentArrayError) retCode = 2;
        else if (err instanceof mongoose.Error.DocumentNotFoundError) retCode = 3;
        else if (err instanceof mongoose.Error.MissingSchemaError) retCode = 4;
        else if (err instanceof mongoose.Error.OverwriteModelError) retCode = 5;
        else if (err instanceof mongoose.Error.ParallelSaveError) retCode = 6;
        // else if (err instanceof mongoose.Error.StrictMode) retCode = 7;
        // ? StrictMode Disabled Currently
        else if (err instanceof mongoose.Error.ValidationError) retCode = 8;
        else if (err instanceof mongoose.Error.ValidatorError) retCode = 9;
      }
    }
    const retDict: ImongoParsedError = {
      code: retCode,
      err: retCode !== 0
        ? err
        : undefined,
      errors: retCode !== 0
        ? err.errors
        : undefined,
      resolvedMessage: retCode !== 0
        ? mongoErrDict[retCode.toString()]
        : undefined,
      message: retCode !== 0
        ? (err as mongoose.Error).message
        : undefined,
    };
    return retDict;
  }

  export function validateDoc<T extends mongoose.Document>(instance: T): IValidDocRet {
    const err = instance.validateSync();

    if (err) {
      const retDict: IValidDocRet = { success: false, error: mongoErrorParser(err) };
      return retDict;
    }
    const retDict: IValidDocRet = { success: true };
    return retDict;
  }

  export function convertObjectId(data: string): mongoose.Types.ObjectId {
    return (new mongoose.Types.ObjectId(data));
  }

  export function convertMongoTimetoKST(time: string | number | Date): Date {
    return new Date(time);
  }
  export function getConnection(): mongoose.Connection {
    return mongoose.connection;
  }
}

export default MONGO_UTIL;
