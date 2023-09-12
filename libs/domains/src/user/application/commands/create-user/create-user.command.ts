import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from './create-user.input';

export class CreateUserCommand implements ICommand {
  id: string;

  username: string;

  constructor(input: CreateUserInput) {
    this.id = input.id;
    this.username = input.username;
  }
}
