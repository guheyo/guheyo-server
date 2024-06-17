import { Parser } from '@app/bot/shared/parsers/parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GroupErrorMessage } from './group.error-message';

@Injectable()
export class GroupParser extends Parser {
  private readonly logger = new Logger(GroupParser.name);

  parseGroupSlugByChannelId(channelId: string): string | null {
    const server = this.discordConfigService.findDiscordServerByChannelId(channelId);
    return server?.slug || null;
  }

  parseGroupSlugByGuildId(guildId: string): string | null {
    const server = this.discordConfigService.findDiscordServerById(guildId);
    return server?.slug || null;
  }

  parseGroupSlugByGuildName(guildName: string): string | null {
    const server = this.discordConfigService.findDiscordServerByName(guildName);
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

  parseCategoryId(categoryName: string, group: GroupResponse): string {
    let category = group.categories.find((c) => c.name === categoryName);

    if (!category) {
      this.logger.log(
        `Category '${categoryName}' not found in Group '${group.name}' Defaulting to 기타`,
      );
      category = group.categories.find((c) => c.name === '기타');

      if (!category) {
        throw new RpcException(GroupErrorMessage.NOT_FOUND_DEFAULT_CATEGORY);
      }
    }
    return category.id;
  }
}
