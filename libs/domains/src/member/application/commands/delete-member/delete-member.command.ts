import { ICommand } from '@nestjs/cqrs/dist';
import { DeleteMemberInput } from './delete-member.input';

export class DeleteMemberCommand implements ICommand {
  id: string;

  userId: string;

  constructor(input: DeleteMemberInput) {
    this.id = input.id;
    this.userId = input.userId;
  }
}
