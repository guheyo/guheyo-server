import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild } from 'discord.js';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { PostClient } from '@app/bot/apps/post/clients/post.client';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';

@Injectable()
export abstract class BulkSavePostsSlashHandler {
  protected readonly logger: Logger;

  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  @Inject()
  protected readonly postClient: PostClient;

  protected discordManager: DiscordManager;

  constructor(context: string) {
    this.logger = new Logger(context);
  }

  abstract saveThreadPost(threadPost: ThreadPost, group: GroupResponse): void;

  async bulkSave(discordGuild: Guild, channelId: string, limit: number) {
    this.discordManager = new DiscordManager(discordGuild);
    const group = await this.groupClient.fetchGroup(discordGuild.id);
    const threadPosts = await this.discordManager.fetchThreadPostsFromForum(channelId, limit);
    const nonExistingThreadPosts = await this.postClient.findNonExistingThreadPosts(threadPosts);
    this.logThreadPostCounts(threadPosts.length, nonExistingThreadPosts.length);

    await this.bulkSaveThreadPosts(nonExistingThreadPosts, group);
  }

  private logThreadPostCounts(totalPosts: number, nonExistingPosts: number): void {
    this.logger.log(`Total thread posts: ${totalPosts}`);
    this.logger.log(`Non-existing thread posts: ${nonExistingPosts}`);
  }

  async bulkSaveThreadPosts(threadPosts: ThreadPost[], group: GroupResponse) {
    return threadPosts.map(async (threadPost) => this.saveThreadPost(threadPost, group));
  }
}
