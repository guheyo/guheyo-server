import { ICommand } from '@nestjs/cqrs';
import { UpdateUserInput } from './update-user.input';

export class UpdateUserCommand implements ICommand {
  id: string;

  username?: string;

  avatarURL?: string;

  constructor(input: UpdateUserInput) {
    this.id = input.id;
    this.username = input.username;
    this.avatarURL = input.avatarURL;
  }
}
