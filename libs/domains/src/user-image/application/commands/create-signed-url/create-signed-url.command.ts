import { ICommand } from '@nestjs/cqrs';
import { CreateSignedUrlInput } from './create-signed-url.input';

export class CreateSignedUrlCommand implements ICommand {
  type: string;

  filename: string;

  userId: string;

  constructor({ input, userId }: { input: CreateSignedUrlInput; userId: string }) {
    this.type = input.type;
    this.filename = input.filename;
    this.userId = userId;
  }
}
