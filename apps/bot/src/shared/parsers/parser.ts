import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Message, PartialMessage } from 'discord.js';
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

  parseIdFromMessage(message: Message | PartialMessage) {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(message.id);
  }
}
