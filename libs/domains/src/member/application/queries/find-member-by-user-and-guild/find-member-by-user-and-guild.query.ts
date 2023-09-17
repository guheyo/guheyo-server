import { IQuery } from '@nestjs/cqrs/dist';
import { FindMemberByUserAndGuildArgs } from './find-member-by-user-and-guild.args';

export class FindMemberByUserAndGuildQuery implements IQuery {
  userId: string;

  guildId: string;

  constructor(args: FindMemberByUserAndGuildArgs) {
    this.userId = args.userId;
    this.guildId = args.guildId;
  }
}
