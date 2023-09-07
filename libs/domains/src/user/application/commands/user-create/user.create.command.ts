import { ICommand } from '@nestjs/cqrs';
import { UserCreateInput } from './user.create.input';

export class UserCreateCommand implements ICommand {
  id: string;

  username: string;

  constructor(public readonly input: UserCreateInput) {
    this.id = input.id;
    this.username = input.username;
  }
}
