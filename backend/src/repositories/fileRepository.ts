import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from '@aws-sdk/client-s3';

const s3 = new S3({
  endpoint: `https://${process.env.S3_ENDPOINT}`,
  region: process.env.S3_ENDPOINT?.split('.')?.[0],
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

type UploadFileInput = Omit<PutObjectCommandInput, 'Bucket'> & { Key: string };

class FileRepository {
  async uploadFile({ Key, Body }: UploadFileInput) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key,
      Body,
      ACL: 'public-read',
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${process.env.S3_BUCKET}.${
      process.env.S3_ENDPOINT
    }/${encodeURI(Key)}`;
  }

  async deleteFile(Key: string) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key,
    };

    await s3.deleteObject(params);
  }
}

export default new FileRepository();
