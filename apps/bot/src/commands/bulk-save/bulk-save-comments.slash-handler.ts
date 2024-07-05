import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild, ThreadChannel } from 'discord.js';
import { CommentClient } from '@app/bot/apps/comment/clients/comment.client';
import { MessageWithUser } from '@app/bot/apps/user/interfaces/user.interfaces';

@Injectable()
export abstract class BulkSaveCommentsSlashHandler {
  protected readonly logger: Logger;

  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  @Inject()
  protected readonly commentClient: CommentClient;

  protected discordManager: DiscordManager;

  constructor(context: string) {
    this.logger = new Logger(context);
  }

  async saveThread(threadChannel: ThreadChannel) {
    try {
      const messageWithUsers = await this.fetchMessageWithUsers(threadChannel);
      await this.commentClient.createCommentsFromMessageWithUsers(
        messageWithUsers.splice(0, messageWithUsers.length - 1),
      );
    } catch (error: any) {
      this.logger.error(`Failed to save thread: ${error.message}`, error.stack);
    }
  }

  async fetchMessageWithUsers(threadChannel: ThreadChannel): Promise<MessageWithUser[]> {
    const messageCollection = await threadChannel.messages.fetch();
    const messages = messageCollection
      .filter((message) => message.content)
      .map((message) => message);
    const messageWithUsers = await messages.reduce(
      async (cc, message) => [
        ...(await cc),
        {
          message,
          user: await this.userClient.fetchMyUser('discord', message.author),
        },
      ],
      Promise.resolve<MessageWithUser[]>([]),
    );
    return messageWithUsers;
  }

  async fetchMessagesWithEmbeds(threadChannel: ThreadChannel) {
    const messageCollection = await threadChannel.messages.fetch();
    return messageCollection
      .filter((message) => message.embeds.length > 0 && !!message.embeds[0].description)
      .map((message) => message);
  }

  async bulkSave(discordGuild: Guild, channelId: string, limit: number) {
    this.discordManager = new DiscordManager(discordGuild);
    const threadChannels = await this.discordManager.fetchThreadChannelsFromForum(channelId, limit);
    await this.bulkSaveThreads(threadChannels);
  }

  async bulkSaveThreads(threadChannels: ThreadChannel[]) {
    return threadChannels.map(async (threadChannel) => this.saveThread(threadChannel));
  }
}
