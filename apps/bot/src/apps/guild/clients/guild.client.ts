import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { FindGuildQuery } from '@lib/domains/guild/application/queries/find-guild/find-guild.query';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { QueryBus } from '@nestjs/cqrs';
import { Message } from 'discord.js';
import { GuildParser } from '../parsers/guild.parser';
import { GuildErrorMessage } from '../parsers/guild.error-message';

@Injectable()
export class GuildClient {
  @Inject()
  private readonly guildParser: GuildParser;

  constructor(readonly queryBus: QueryBus) {}

  async fetchGuildFromMessage(message: Message) {
    const slug = this.guildParser.parseGuildSlugFromMessage(message);
    if (!slug) throw new RpcException(GuildErrorMessage.NOT_FOUND_GUILD_SLUG);

    const guild = await this.findGuild(slug);
    if (!guild) throw new RpcException(GuildErrorMessage.NOT_FOUND_GUILD);
    return guild;
  }

  async findGuild(slug: string): Promise<GuildResponse | null> {
    return this.queryBus.execute(new FindGuildQuery({ slug }));
  }
}
