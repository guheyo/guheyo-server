import { ICommand } from '@nestjs/cqrs';
import { UpdateUserInput } from './update-user.input';

export class UpdateUserCommand implements ICommand {
  id: string;

  username?: string;

  name?: string;

  about?: string;

  phoneNumber?: string;

  avatarURL?: string;

  constructor(input: UpdateUserInput) {
    this.id = input.id;
    this.username = input.username;
    this.name = input.name;
    this.about = input.about;
    this.phoneNumber = input.phoneNumber;
    this.avatarURL = input.avatarURL;
  }
}
