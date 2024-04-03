import { ICommand } from '@nestjs/cqrs';
import { UpdateUserImageInput } from './update-user-image.input';

export class UpdateUserImageCommand implements ICommand {
  id: string;

  position: number;

  constructor(input: UpdateUserImageInput) {
    this.id = input.id;
    this.position = input.position;
  }
}
