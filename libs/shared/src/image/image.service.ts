import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import axios from 'axios';
import mimeTypes from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ImageErrorMessage } from './image.error.message';
import { SignedUrlResponse } from './image.response';

@Injectable()
export class ImageService {
  client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get('aws.s3.region')!,
      credentials: {
        accessKeyId: this.configService.get('aws.s3.accessKeyId')!,
        secretAccessKey: this.configService.get('aws.s3.secretAccessKey')!,
      },
    });
  }

  async createSignedUrl({
    type,
    userId,
    filename,
  }: {
    type: string;
    userId: string;
    filename: string;
  }): Promise<SignedUrlResponse> {
    const uploadPath = this.generateUploadPath(type, userId);
    const uniqueFilename = this.generateUniqueFilename(filename);
    const key = this.createFileKey(uploadPath, uniqueFilename);

    const command = new PutObjectCommand({
      Bucket: this.configService.get('aws.s3.bucket'),
      Key: key,
      ContentType: 'image/*',
    });

    return {
      signedUrl: await getSignedUrl(this.client, command, {
        expiresIn: 60 * 15, // 15 mins
      }),
      url: this.createFileUrl(key),
    };
  }

  async uploadFile({
    file,
    type,
    userId,
    filename,
  }: {
    file: Buffer;
    type: string;
    userId: string;
    filename: string;
  }) {
    const uploadPath = this.generateUploadPath(type, userId);
    const uniqueFilename = this.generateUniqueFilename(filename);
    const key = this.createFileKey(uploadPath, uniqueFilename);
    const mimeType = this.parseMimeType(key);

    const command = new PutObjectCommand({
      Bucket: this.configService.get('aws.s3.bucket'),
      Key: key,
      ContentType: mimeType,
      Body: file,
    });
    await this.client.send(command);
    const s3URL = this.createFileUrl(key);
    return s3URL;
  }

  async uploadFileFromURL({ url, type, userId }: { url: string; type: string; userId: string }) {
    const { buffer } = await this.downloadFile(url);
    const filename = this.parseNameFromURL(url);

    return this.uploadFile({
      file: buffer,
      type,
      userId,
      filename,
    });
  }

  parseNameFromURL(url: string) {
    const re = /\/([^?/]+)(?=\?|$)/;
    const match = re.exec(url);
    if (!match) throw new Error(ImageErrorMessage.INVALID_URL_FORMAT);
    return match[1];
  }

  parseMimeType(url: string) {
    return mimeTypes.lookup(url) || undefined;
  }

  private async downloadFile(url: string) {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(res.data, 'binary');
    return {
      buffer,
    };
  }

  private createFileKey(uploadPath: string, filename: string) {
    return `${uploadPath}/${filename}`;
  }

  private createFileUrl(key: string) {
    return `${this.configService.get('aws.s3.domain')}/${key}`;
  }

  private generateUploadPath(type: string, userId: string) {
    const yyyymm = dayjs().format('YYYYMM');
    return `${type}/${yyyymm}/${userId}`;
  }

  private generateUniqueFilename(filename: string): string {
    const extension = path.extname(filename); // Get the file extension
    const uniqueName = uuidv4(); // Generate a unique identifier
    return `${uniqueName}${extension}`; // Combine the unique ID with the original file extension
  }
}
