import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import mimeTypes from 'mime-types';
import { nanoid } from 'nanoid';

@Injectable()
export class ImageService {
  client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get('s3.region')!,
      credentials: {
        accessKeyId: this.configService.get('s3.accessKeyId')!,
        secretAccessKey: this.configService.get('s3.secretAccessKey')!,
      },
    });
  }

  async generateSignedUrl(path: string, filename: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('s3.bucket'),
      Key: `${path}/${filename}`,
    });
    return getSignedUrl(this.client, command, {
      expiresIn: 60,
    });
  }

  async downloadFile(url: string) {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(res.data, 'binary');
    const extension = mimeTypes.extension(res.headers['content-type']);
    return {
      buffer,
      extension,
    };
  }

  async uploadFile(key: string, file: Buffer) {
    const mimeType = mimeTypes.lookup(key) || 'image/png';
    const command = new PutObjectCommand({
      Bucket: this.configService.get('s3.bucket'),
      Key: key,
      ContentType: mimeType,
      Body: file,
    });
    await this.client.send(command);
    const s3url = this.createFileUrl(key);
    return s3url;
  }

  async uploadFileFromURL(url: string, path: string) {
    const { buffer, extension } = await this.downloadFile(url);
    if (!extension) throw new Error('Invalid extension');
    const key = this.createFileKey(path, extension);
    return this.uploadFile(key, buffer);
  }

  createFileKey(path: string, extension: string) {
    return `${path}/${nanoid()}.${extension}`;
  }

  createFileUrl(key: string) {
    return `${this.configService.get('s3.domain')}/${key}`;
  }
}
