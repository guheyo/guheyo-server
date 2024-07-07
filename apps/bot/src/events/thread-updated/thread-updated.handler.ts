import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommunityChannelGuard } from '@app/bot/apps/thread/guards/community-channel.guard';
import { ThreadClient } from '@app/bot/apps/thread/clients/thread.client';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { ThreadChannel } from 'discord.js';
import { PostMessageGuard } from '@app/bot/apps/post/guards/post-message.guard';

@UseGuards(GroupGuard, CommunityChannelGuard, PostMessageGuard)
@Name('커스텀 키보드')
@Injectable()
export class ThreadUpdatedHandler {
  protected readonly logger: Logger;

  protected discordManager: DiscordManager;

  constructor(private readonly threadClient: ThreadClient) {}

  @On('messageUpdate')
  public async onUpdateThread(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageUpdate'>,
  ) {
    if (!message.guild) {
      this.logger.warn(
        `Guild not found. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
      return;
    }
    this.discordManager = new DiscordManager(message.guild);

    const channel = message.channel as ThreadChannel;
    if (!channel.parentId) {
      this.logger.warn(
        `Message parentId. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
      return;
    }

    const forumChannel = await this.discordManager.fetchForumChannel(channel.parentId);
    const threadPost = await this.discordManager.fetchThreadPost(
      channel,
      forumChannel.availableTags,
    );
    if (!threadPost) {
      this.logger.warn(
        `Thread post not fetched. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
      return;
    }

    await this.threadClient.updateThreadFromPost(user, threadPost);
  }
}
