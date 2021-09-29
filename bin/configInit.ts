import AWS from 'aws-sdk';

export async function configInit(): Promise<void> {
  const {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
  } = process.env;
  const AWS_CONF: AWS.ConfigurationOptions = {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  };
  AWS.config.update(AWS_CONF);
}

export default {};
