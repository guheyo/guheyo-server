import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import mimeTypes from 'mime-types';
import { nanoid } from "nanoid";

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  }
});

const imageService = {
  async generateSignedUrl(path: string, filename: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `${path}/${filename}`
    });
    return getSignedUrl(client, command, {
      expiresIn: 60
    });
  },
  async downloadFile(url: string) {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(res.data, 'binary');
    const extension = mimeTypes.extension(res.headers["content-type"]);
    return {
      buffer,
      extension
    };
  },
  async uploadFile(key: string, file: Buffer) {
    const mimeType = mimeTypes.lookup(key) || 'image/png';
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: mimeType,
      Body: file,
    });
    await client.send(command);
    const s3url = this.createFileUrl(key);
    return s3url;
  },
  async uploadFileFromURL({
    url,
    type,
    id
  }: {
    url: string,
    type: ImageType,
    id: string
  }) {
    const { buffer, extension } = await this.downloadFile(url);
    if(!extension) throw new Error('Invalid extension');
    const key = this.createFileKey({
      type: type,
      id: id,
      extension: extension
    });
    return this.uploadFile(key, buffer);
  },
  createFileKey({ type, id, extension }: CreateFileKeyParams) {
    return `${type}/${id}/${nanoid()}.${extension}`
  },
  createFileUrl(key: string) {
    return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  },
}

interface CreateFileKeyParams {
  type: ImageType
  id: string
  extension: string
}

type ImageType = 'posts' | 'users';

export default imageService;