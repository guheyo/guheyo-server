import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild } from 'discord.js';
import { PostMessage } from '@app/bot/shared/interfaces/post-message.interfaces';
import { UserReviewClient } from '@app/bot/apps/user-review/clients/user-review.client';

@Injectable()
export abstract class BulkSavePostsSlashCommandHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  protected discordManager: DiscordManager;

  constructor(protected readonly userReviewClient: UserReviewClient) {}

  async bulkSave(discordGuild: Guild, guildName: string, categoryName: string, limit: number) {
    const channelId = this.groupParser.discordConfigService.findCommunityChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    this.discordManager = new DiscordManager(discordGuild);
    const postMessages = await this.discordManager.fetchPostMessagesFromForum(channelId, limit);
    await this.bulkSavePostMessages(postMessages, discordGuild);
  }

  async bulkSavePostMessages(postMessages: PostMessage[], discordGuild: Guild) {
    return postMessages.map(async (postMessage) => this.saveMessage(postMessage, discordGuild));
  }

  async saveMessage(postMessage: PostMessage, discordGuild: Guild) {
    try {
      const member = await this.discordManager.fetchMember(
        discordGuild,
        postMessage.message.author,
      );
      const user = await this.userClient.fetchMyUser('discord', member);
      const group = await this.groupClient.fetchGroupFromMessage(postMessage.message);
      const tags = await this.groupClient.fetchTags();
      await this.userReviewClient.createUserReviewFromPostMessage(user, postMessage, group, tags);
    } catch (e) {
      // NOTE: do nothing
      // console.log(e);
    }
  }
}
