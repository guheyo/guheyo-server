import { ICommand } from '@nestjs/cqrs';
import { UserDeleteInput } from './user.delete.input';

export class UserDeleteCommand implements ICommand {
  id: string;

  constructor(public readonly input: UserDeleteInput) {
    this.id = input.id;
  }
}
