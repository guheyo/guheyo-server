import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild, ThreadChannel } from 'discord.js';
import { CommentClient } from '@app/bot/apps/comment/clients/comment.client';
import { MessageWithUser } from '@app/bot/apps/user/interfaces/user.interfaces';

@Injectable()
export abstract class BulkSaveCommentsSlashCommandHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  @Inject()
  protected readonly commentClient: CommentClient;

  protected discordManager: DiscordManager;

  async saveThread(threadChannel: ThreadChannel) {
    const messageCollection = await threadChannel.messages.fetch();
    const messageWithUsers = await messageCollection.reduce(
      async (cc, message) => [
        ...(await cc),
        {
          message,
          user: await this.userClient.fetchMyUser('discord', message.author),
        },
      ],
      Promise.resolve<MessageWithUser[]>([]),
    );
    await this.commentClient.createCommentsFromMessageWithUsers(messageWithUsers);
  }

  async bulkSave(discordGuild: Guild, guildName: string, categoryName: string, limit: number) {
    const channelId = this.groupParser.discordConfigService.findCommunityChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    this.discordManager = new DiscordManager(discordGuild);
    const threadChannels = await this.discordManager.fetchThreadChannelsFromForum(channelId, limit);
    await this.bulkSaveThreads(threadChannels);
  }

  async bulkSaveThreads(threadChannels: ThreadChannel[]) {
    return threadChannels.map(async (threadChannel) => this.saveThread(threadChannel));
  }
}
