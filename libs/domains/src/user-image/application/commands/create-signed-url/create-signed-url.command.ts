import { ICommand } from '@nestjs/cqrs';
import { CreateSignedUrlInput } from './create-signed-url.input';

export class CreateSignedUrlCommand implements ICommand {
  type: string;

  userId: string;

  filename: string;

  constructor(input: CreateSignedUrlInput) {
    this.type = input.userId;
    this.userId = input.userId;
    this.filename = input.filename;
  }
}
