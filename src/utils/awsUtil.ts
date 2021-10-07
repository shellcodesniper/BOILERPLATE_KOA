import AWS from 'aws-sdk';
import crypto from 'crypto';
import { File } from 'formidable';
import fs from 'fs';
import path from 'path';

namespace AWS_UTIL {
  const s3: AWS.S3 = new AWS.S3();
  const bucket = process.env.AWS_S3_BUCKET_NAME as string;
  const uploadPrefixPath = process.env.AWS_S3_UPLOAD_PATH as string;

  export async function uploadFile(file: File): Promise<[string, string]> {
    const extRe = /(?:\.([^.]+))?$/;
    const name = file.name as string;
    const fileExt = extRe.exec(name)?.[1] || '';
    const ext = (fileExt === '') ? '' : `.${fileExt}`;
    const hash = crypto.createHash('sha512')
      .update(name.toString())
      .update(file.size.toString())
      .update(Date.now().toString())
      .digest('hex');

    const uploadMiddlePath = (file.type as string).toString().includes('image') ? 'images' : 'files';
    const uploadPath = path.join(uploadPrefixPath, uploadMiddlePath, `${hash}${ext}`);
    const fileBuffer = fs.readFileSync(file.path);

    const params = {
      Bucket: bucket,
      Key: uploadPath,
      ACL: 'public-read',
      Body: fileBuffer,
      ContentType: (file.type as string),
    };

    const location: Record<string, string> = await new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => (err == null ? resolve(data) : reject(err)));
    });

    const Location = location.Location as string;

    return [uploadPath, Location];
  }
  // NOTE 이미지 / 파일 업로드 이루어지는 함수, [업로드된 위치, 웹 접속 주소] 반환

  export async function uploadBuffer(fileBuffer: Buffer, name: string): Promise<[string, string]> {
    const extRe = /(?:\.([^.]+))?$/;
    const fileExt = extRe.exec(name)?.[1] || '';
    const ext = (fileExt === '') ? '' : `.${fileExt}`;
    const hash = crypto.createHash('sha512')
      .update(name.toString())
      .update(fileBuffer.length.toString())
      .update(Date.now().toString())
      .digest('hex');

    const uploadPath = `${uploadPrefixPath}/files/${hash}${ext}`;

    const params = {
      Bucket: bucket,
      Key: uploadPath,
      ACL: 'public-read',
      Body: fileBuffer,
    };
    const location: Record<string, string> = await new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => (err == null ? resolve(data) : reject(err)));
    });
    const Location = location.Location as string;

    return [uploadPath, Location];
  }
  // NOTE 파일 업로드가 이루어지는 함수, [업로드된 위치, 웹 접속 주소] 반환

  export async function deleteFile(Key: string): Promise<boolean> {
    await new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: bucket, Key,
        }, (err: any, data: any) => (err == null ? resolve(data) : reject(err)),
      );
    });
    // const success = await FILESTORAGE_SERVICE.deleteFileStorage({ Bucket, Key });
    // if (success) return true;
    return true;
    // return false;
  }
  // NOTE 파일 삭제 함수 (key : path)

  export async function getUrl(Key: string): Promise<string> {
    const res = await s3.getSignedUrlPromise('getObject', { Bucket: bucket, Key });
    return res;
  }
  // NOTE 파일 url 가져오는 함수 ( key: post )

  // * 외부에서 사용하는 함수, 파일업로드 * //

  export async function uploadImage(image: File): Promise<string> {
    const type = image.type as string;
    if (type.toString().includes('image')) {
      const [, link] = await uploadFile(image);
      return link;
    }
    return '';
  }
  // NOTE 이미지만 업로드 허용하도록 해둠, 파일 검사는 content type으로 이루어짐 > 반환 : url

}

export default AWS_UTIL;
