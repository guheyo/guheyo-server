import { IQuery } from '@nestjs/cqrs/dist';

export class FindMemberByUserAndGuildQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly guildId: string,
  ) {}
}
