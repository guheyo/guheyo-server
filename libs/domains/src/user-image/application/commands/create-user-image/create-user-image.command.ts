import { ICommand } from '@nestjs/cqrs';
import { CreateUserImageInput } from './create-user-image.input';

export class CreateUserImageCommand implements ICommand {
  id: string;

  name: string;

  url: string;

  contentType?: string;

  description?: string;

  height?: number;

  width?: number;

  position: number;

  type: string;

  refId: string;

  tracked: boolean;

  userId: string;

  constructor(input: CreateUserImageInput) {
    this.id = input.id;
    this.name = input.name;
    this.url = input.url;
    this.contentType = input.contentType;
    this.description = input.description;
    this.height = input.height;
    this.width = input.width;
    this.position = input.position;
    this.type = input.type;
    this.refId = input.refId;
    this.tracked = input.tracked;
    this.userId = input.userId;
  }
}
