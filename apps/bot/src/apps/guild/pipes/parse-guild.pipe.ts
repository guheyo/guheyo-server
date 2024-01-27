import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { Message } from 'discord.js';
import { GuildClient } from '../clients/guild.client';
import { GuildParser } from '../parsers/guild.parser';

@Injectable()
export class ParseGuildPipe implements PipeTransform {
  constructor(
    private readonly guildClient: GuildClient,
    private readonly guildParser: GuildParser,
  ) {}

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<GuildResponse> {
    let message: Message;

    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();

    const slug = this.guildParser.parseGuildSlugFromMessage(message);
    if (!slug) throw new RpcException('');

    const guild = await this.guildClient.findGuild(slug);
    if (!guild) throw new RpcException('');
    return guild;
  }
}
