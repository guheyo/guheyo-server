import { ICommand } from '@nestjs/cqrs/dist';
import { CreateMemberInput } from './create-member.input';

export class CreateMemberCommand implements ICommand {
  id: string;

  userId: string;

  guildId: string;

  constructor(input: CreateMemberInput) {
    this.id = input.id;
    this.userId = input.userId;
    this.guildId = input.guildId;
  }
}
