import { ICommand } from '@nestjs/cqrs';
import { UploadAndCreateImageInput } from './upload-and-create-image.input';

export class UploadAndCreateImageCommand implements ICommand {
  type: string;

  refId: string;

  userId: string;

  url: string;

  source: string;

  constructor(input: UploadAndCreateImageInput) {
    this.type = input.type;
    this.refId = input.refId;
    this.userId = input.userId;
    this.url = input.url;
    this.source = input.source;
  }
}
