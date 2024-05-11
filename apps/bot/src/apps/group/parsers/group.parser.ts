import { Parser } from '@app/bot/shared/parsers/parser';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupParser extends Parser {
  parseGroupSlug(channelId: string): string | null {
    const server = this.discordConfigService.findDiscordServerByChannelId(channelId);
    return server?.slug || null;
  }

  parseGroupId(channelId: string): string {
    const server = this.discordConfigService.findDiscordServerByChannelId(channelId);
    return this.discordIdConverter.convertIdUsingDiscordNamespace(server?.name || '');
  }

  parseRootGroupId() {
    return this.discordIdConverter.convertIdUsingDiscordNamespace('root');
  }

  parseTagIds(tagNames: string[], tags: TagResponse[]): string[] {
    return tags.filter((tag) => tagNames.includes(tag.name)).map((tag) => tag.id);
  }
}
