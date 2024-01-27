import { Parser } from '@app/bot/shared/parsers/parser';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class GuildParser extends Parser {
  parseGuildSlugFromMessage(message: Message): string | null {
    const server = this.discordConfigService.findDiscordServerByMessage(message);
    return server?.slug || null;
  }

  parseGuildIdFromMessage(message: Message): string {
    const server = this.discordConfigService.findDiscordServerByMessage(message);
    return this.discordIdConverter.convertIdUsingDiscordNamespace(server?.name || '');
  }

  parseRootGuildId() {
    return this.discordIdConverter.convertIdUsingDiscordNamespace('root');
  }
}
