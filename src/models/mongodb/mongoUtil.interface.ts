export interface ImongoParsedError {
  code: number;
  err?: any;
  errors?: any;
  resolvedMessage?: string;
  message?: any;
}

export interface IValidDocRet {
  success: boolean;
  error?: ImongoParsedError;
}
