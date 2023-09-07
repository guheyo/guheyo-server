import { ICommand } from '@nestjs/cqrs';
import { UserDeleteInput } from './user.delete.input';

export class UserDeleteCommand implements ICommand {
  id: string;

  constructor(input: UserDeleteInput) {
    this.id = input.id;
  }
}
