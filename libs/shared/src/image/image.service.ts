import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import mimeTypes from 'mime-types';
import { ImageErrorMessage } from './image.error.message';

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
    const command = new PutObjectCommand({
      Bucket: this.configService.get('s3.bucket'),
      Key: `${path}/${filename}`,
      ContentType: 'image/*',
    });
    return getSignedUrl(this.client, command, {
      expiresIn: 60 * 30,
    });
  }

  async downloadFile(url: string) {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(res.data, 'binary');
    return {
      buffer,
    };
  }

  async uploadFile(key: string, file: Buffer) {
    const mimeType = mimeTypes.lookup(key);
    const command = new PutObjectCommand({
      Bucket: this.configService.get('s3.bucket'),
      Key: key,
      ContentType: mimeType || undefined,
      Body: file,
    });
    await this.client.send(command);
    const s3URL = this.createFileUrl(key);
    return {
      url: s3URL,
      contentType: mimeType || undefined,
    };
  }

  async uploadFileFromURL(url: string, path: string) {
    const { buffer } = await this.downloadFile(url);
    const name = this.parseNameFromURL(url);
    const key = this.createFileKey(path, name);
    return {
      name,
      ...(await this.uploadFile(key, buffer)),
    };
  }

  createFileKey(path: string, name: string) {
    return `${path}/${name}`;
  }

  createFileUrl(key: string) {
    return `${this.configService.get('s3.domain')}/${key}`;
  }

  parseNameFromURL(url: string) {
    const re = /\/([^?/]+)(?=\?|$)/;
    const match = re.exec(url);
    if (!match) throw new Error(ImageErrorMessage.INVALID_URL_FORMAT);
    return match[1];
  }

  generateUploadPath(userId: string, type: string, id: string) {
    return `images/${userId}/${type}/${id}`;
  }
}
