import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserReviewClient } from '@app/bot/apps/user-review/clients/user-review.client';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ThreadChannel } from 'discord.js';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashHandler } from './bulk-save-posts.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewsSlashHandler extends BulkSavePostsSlashHandler {
  constructor(protected readonly userReviewClient: UserReviewClient) {
    super();
  }

  async saveThreadPost(threadPost: ThreadPost) {
    try {
      const mentionedUser = await threadPost.starterMessage.mentions.users.first();
      if (!mentionedUser) return;
      const reviewedUser = await this.userClient.fetchMyUser('discord', mentionedUser);
      const channelId = (threadPost.starterMessage.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const member = await this.discordManager.fetchMember(threadPost.starterMessage.author.id);
      const user = await this.userClient.fetchMyUser('discord', member);
      const group = await this.groupClient.fetchGroup(channelId);
      const tags = await this.groupClient.fetchTags();
      await this.userReviewClient.createUserReviewFromPost(
        user,
        reviewedUser.id,
        threadPost,
        group,
        tags,
      );
    } catch (e) {
      // NOTE: do nothing
      // console.log(e);
    }
  }

  @SlashCommand({
    name: 'bulk-save-user-reviews',
    description: 'Bulk Save UserReviews',
  })
  public async onBuckSaveUserReviews(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;

    const channelId = this.groupParser.discordConfigService.findCommunityChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    await this.bulkSave(interaction.guild, channelId, limit);
  }
}
