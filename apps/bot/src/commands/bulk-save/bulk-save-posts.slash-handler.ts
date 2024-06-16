import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild } from 'discord.js';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { PostClient } from '@app/bot/apps/post/clients/post.client';

@Injectable()
export abstract class BulkSavePostsSlashHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  @Inject()
  protected readonly postClient: PostClient;

  protected discordManager: DiscordManager;

  abstract saveThreadPost(threadPost: ThreadPost): void;

  async bulkSave(discordGuild: Guild, channelId: string, limit: number) {
    this.discordManager = new DiscordManager(discordGuild);
    const threadPosts = await this.discordManager.fetchThreadPostsFromForum(channelId, limit);
    const nonExistingThreadPosts = await this.postClient.findNonExistingThreadPosts(threadPosts);
    await this.bulkSaveThreadPosts(nonExistingThreadPosts);
  }

  async bulkSaveThreadPosts(threadPosts: ThreadPost[]) {
    return threadPosts.map(async (threadPost) => this.saveThreadPost(threadPost));
  }
}
