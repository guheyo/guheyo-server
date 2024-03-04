import { ICommand } from '@nestjs/cqrs';
import { CreateUserImageInput } from './create-user-image.input';

export class CreateUserImageCommand implements ICommand {
  id: string;

  name: string;

  url: string;

  contentType?: string;

  description?: string;

  size?: number;

  height?: number;

  width?: number;

  position: number;

  type: string;

  refId: string;

  userId: string;

  source: string;

  constructor(input: CreateUserImageInput) {
    this.id = input.id;
    this.name = input.name;
    this.url = input.url;
    this.contentType = input.contentType;
    this.description = input.description;
    this.size = input.size;
    this.height = input.height;
    this.width = input.width;
    this.position = input.position;
    this.type = input.type;
    this.refId = input.refId;
    this.userId = input.userId;
    this.source = input.source;
  }
}
