import { ICommand } from '@nestjs/cqrs';
import { UserUpdateInput } from './user.update.input';

export class UserUpdateCommand implements ICommand {
  id: string;

  name?: string;

  avatarURL?: string;

  constructor(public readonly input: UserUpdateInput) {
    this.id = input.id;
    this.name = input.name;
    this.avatarURL = input.avatarURL;
  }
}
