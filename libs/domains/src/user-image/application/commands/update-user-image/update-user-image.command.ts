import { ICommand } from '@nestjs/cqrs';
import { UpdateUserImageInput } from './update-user-image.input';

export class UpdateUserImageCommand implements ICommand {
  id: string;

  position: number;

  userId: string;

  constructor({ input, userId }: { input: UpdateUserImageInput; userId: string }) {
    this.id = input.id;
    this.position = input.position;
    this.userId = userId;
  }
}
