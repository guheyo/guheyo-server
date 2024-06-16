import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { BaseChannel } from 'discord.js';
import { DiscordIdConverter } from '@app/bot/shared/converters/discord-id-converter';
import { DiscordConfigService } from '../discord/discord.config.service';

@Injectable()
export abstract class Parser {
  @Inject()
  readonly discordIdConverter: DiscordIdConverter;

  @Inject()
  readonly discordConfigService: DiscordConfigService;

  generateUUID() {
    return uuid4();
  }

  isValidFormat(match: RegExpExecArray | null) {
    return !!match;
  }

  parseIdFromMessageId(messageId: string) {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(messageId);
  }

  parsePostIdFromMessageId(messageId: string) {
    return this.discordIdConverter.convertIdUsingGroupNamespace(messageId);
  }

  parseIdFromChannel(channel: BaseChannel) {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(channel.id);
  }
}
