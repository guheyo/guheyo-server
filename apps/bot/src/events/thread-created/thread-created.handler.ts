import { Inject, Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadChannelGuard } from '@app/bot/apps/thread/guards/thread-channel.guard';
import { ThreadClient } from '@app/bot/apps/thread/clients/thread.client';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { ThreadChannel } from 'discord.js';
import { PostMessageGuard } from '@app/bot/apps/post/guards/post-message.guard';
import { DiscordConfigService } from '@app/bot/shared/discord/discord.config.service';

@UseGuards(GroupGuard, ThreadChannelGuard, PostMessageGuard)
@Name('커스텀 키보드')
@Injectable()
export class ThreadCreatedHandler {
  protected readonly logger: Logger;

  protected discordManager: DiscordManager;

  @Inject()
  readonly discordConfigService: DiscordConfigService;

  constructor(private readonly threadClient: ThreadClient) {}

  @On('messageCreate')
  public async onCreateThread(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
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

    if (!channel.parent) return;
    const threadChannel = this.discordConfigService.findThreadChannel(
      '커스텀 키보드',
      channel.parent.name,
    );
    if (!threadChannel) return;

    await this.threadClient.createThreadFromPost({
      user,
      threadPost,
      group,
      categorySource: threadChannel.categorySource,
    });
  }
}
