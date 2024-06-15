import { ICommand } from '@nestjs/cqrs';
import { UploadAndCreateImageInput } from './upload-and-create-image.input';

export class UploadAndCreateImageCommand implements ICommand {
  type: string;

  refId: string;

  url: string;

  source: string;

  userId: string;

  constructor({ input, userId }: { input: UploadAndCreateImageInput; userId: string }) {
    this.type = input.type;
    this.refId = input.refId;
    this.url = input.url;
    this.source = input.source;
    this.userId = userId;
  }
}
