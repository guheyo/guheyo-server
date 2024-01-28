import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { Message } from 'discord.js';
import { GuildClient } from '../clients/guild.client';

@Injectable()
export class ParseGuildPipe implements PipeTransform {
  constructor(private readonly guildClient: GuildClient) {}

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<GuildResponse> {
    let message: Message;

    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();

    return this.guildClient.fetchGuildFromMessage(message);
  }
}
