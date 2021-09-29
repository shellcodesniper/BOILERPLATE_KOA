export interface IEnv {
  // ? NODEJS Default ENV interface
  TZ?: string;
  // ? DONE

  MYSQL_HOST?: string;
  MYSQL_PORT?: string;
  MYSQL_USER?: string;
  MYSQL_PASS?: string;
  MYSQL_DB? : string;

  MONGO_HOST?: string;
  MONGO_USER?: string;
  MONGO_PASS?: string;
  MONGO_DB?: string;

  AWS_ACCESS_KEY?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;

  AWS_S3_BUCKET_NAME?: string;
  AWS_S3_UPLOAD_PATH?: string;
}
