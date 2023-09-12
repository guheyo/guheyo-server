import { ICommand } from '@nestjs/cqrs';
import { DeleteUserInput } from './delete-user.input';

export class DeleteUserCommand implements ICommand {
  id: string;

  constructor(input: DeleteUserInput) {
    this.id = input.id;
  }
}
