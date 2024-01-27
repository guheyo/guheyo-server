import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { FindGuildQuery } from '@lib/domains/guild/application/queries/find-guild/find-guild.query';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class GuildClient {
  constructor(readonly queryBus: QueryBus) {}

  async findGuild(slug: string): Promise<GuildResponse | null> {
    return this.queryBus.execute(new FindGuildQuery({ slug }));
  }
}
