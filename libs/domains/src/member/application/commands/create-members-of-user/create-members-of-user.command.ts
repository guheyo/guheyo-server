import { ICommand } from '@nestjs/cqrs';
import { CreateMembersOfUserInput } from './create-members-of-user.input';

export class CreateMembersOfUserCommand implements ICommand {
  input: CreateMembersOfUserInput;

  constructor(input: CreateMembersOfUserInput) {
    this.input = input;
  }
}
