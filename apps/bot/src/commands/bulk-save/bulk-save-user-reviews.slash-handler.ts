import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserReviewClient } from '@app/bot/apps/user-review/clients/user-review.client';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ThreadChannel } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { BulkSavePostsSlashHandler } from './bulk-save-posts.slash-handler';
import { BulkSavePostRequest } from './bulk-save-post.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewsSlashHandler extends BulkSavePostsSlashHandler {
  constructor(protected readonly userReviewClient: UserReviewClient) {
    super(BulkSaveUserReviewsSlashHandler.name);
  }

  async saveThreadPost({
    threadPost,
    group,
    categorySource,
  }: {
    threadPost: ThreadPost;
    group: GroupResponse;
    categorySource: string;
  }) {
    try {
      const mentionedUser = await threadPost.starterMessage.mentions.users.first();
      if (!mentionedUser) return;
      const reviewedUser = await this.userClient.fetchMyUser('discord', mentionedUser);
      const channelId = (threadPost.starterMessage.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const { author } = threadPost.starterMessage;
      const user = await this.userClient.fetchMyUser('discord', author);
      const tags = await this.groupClient.fetchTags();
      await this.userReviewClient.createUserReviewFromPost(
        user,
        reviewedUser.id,
        threadPost,
        group,
        tags,
      );
    } catch (error: any) {
      this.logger.error(`Failed to save thread post: ${error.message}`, error.stack);
    }
  }

  @SlashCommand({
    name: 'bulk-save-user-reviews',
    description: 'Bulk Save UserReviews',
  })
  public async onBuckSaveUserReviews(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, channelName, limit }: BulkSavePostRequest,
  ) {
    if (!interaction.guild) return;

    const channel = this.groupParser.discordConfigService.findThreadChannel(guildName, channelName);
    if (!channel) return;

    await this.bulkSave({
      discordGuild: interaction.guild,
      guildName,
      channelId: channel.id,
      categorySource: 'none',
      limit,
    });
  }
}
