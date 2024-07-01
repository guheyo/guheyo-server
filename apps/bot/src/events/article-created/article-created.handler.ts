import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommunityChannelGuard } from '@app/bot/apps/article/guards/community-channel.guard';
import { ArticleClient } from '@app/bot/apps/article/clients/article.client';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { ThreadChannel } from 'discord.js';

@UseGuards(GroupGuard, CommunityChannelGuard)
@Name('커스텀 키보드')
@Injectable()
export class ArticleCreatedHandler {
  protected readonly logger: Logger;

  protected discordManager: DiscordManager;

  constructor(
    private readonly groupClient: GroupClient,
    private readonly articleClient: ArticleClient,
  ) {}

  @On('messageCreate')
  public async onCreateArticle(
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

    const tags = await this.groupClient.fetchTags();
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

    await this.articleClient.createArticleFromPost(user, threadPost, group, tags);
  }
}
