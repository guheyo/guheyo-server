import { ICommand } from '@nestjs/cqrs';
import { UpdateUserInput } from './update-user.input';

export class UpdateUserCommand implements ICommand {
  id: string;

  name?: string;

  avatarURL?: string;

  constructor(input: UpdateUserInput) {
    this.id = input.id;
    this.name = input.name;
    this.avatarURL = input.avatarURL;
  }
}
