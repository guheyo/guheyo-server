import { Parser } from '@app/bot/shared/parsers/parser';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class GroupParser extends Parser {
  parseGroupSlugFromMessage(message: Message): string | null {
    const server = this.discordConfigService.findDiscordServerByMessage(message);
    return server?.slug || null;
  }

  parseGroupIdFromMessage(message: Message): string {
    const server = this.discordConfigService.findDiscordServerByMessage(message);
    return this.discordIdConverter.convertIdUsingDiscordNamespace(server?.name || '');
  }

  parseRootGroupId() {
    return this.discordIdConverter.convertIdUsingDiscordNamespace('root');
  }
}
