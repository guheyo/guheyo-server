import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild } from 'discord.js';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';

@Injectable()
export abstract class BulkSavePostsSlashCommandHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  protected discordManager: DiscordManager;

  abstract saveThreadPost(threadPost: ThreadPost, discordGuild: Guild): void;

  async bulkSave(discordGuild: Guild, guildName: string, categoryName: string, limit: number) {
    const channelId = this.groupParser.discordConfigService.findCommunityChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    this.discordManager = new DiscordManager(discordGuild);
    const threadPosts = await this.discordManager.fetchThreadPostsFromForum(channelId, limit);
    await this.bulkSaveThreadPosts(threadPosts, discordGuild);
  }

  async bulkSaveThreadPosts(threadPosts: ThreadPost[], discordGuild: Guild) {
    return threadPosts.map(async (threadPost) => this.saveThreadPost(threadPost, discordGuild));
  }
}
