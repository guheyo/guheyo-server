import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateMemberInput } from './update-member.input';

export class UpdateMemberCommand implements ICommand {
  id: string;

  userId: string;

  constructor(input: UpdateMemberInput) {
    this.id = input.id;
    this.userId = input.userId;
  }
}
