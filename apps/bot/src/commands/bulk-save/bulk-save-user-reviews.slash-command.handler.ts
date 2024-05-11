import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserReviewClient } from '@app/bot/apps/user-review/clients/user-review.client';
import { PostMessage } from '@app/bot/shared/interfaces/post-message.interfaces';
import { Guild, ThreadChannel } from 'discord.js';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashCommandHandler } from './bulk-save-posts.slash-command.handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewsSlashCommandHandler extends BulkSavePostsSlashCommandHandler {
  constructor(protected readonly userReviewClient: UserReviewClient) {
    super();
  }

  async saveMessage(postMessage: PostMessage, discordGuild: Guild) {
    try {
      const mentionedUser = await postMessage.message.mentions.users.first();
      if (!mentionedUser) return;
      const reviewedUser = await this.userClient.fetchMyUser('discord', mentionedUser);
      const channelId = (postMessage.message.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const member = await this.discordManager.fetchMember(
        discordGuild,
        postMessage.message.author,
      );
      const user = await this.userClient.fetchMyUser('discord', member);
      const group = await this.groupClient.fetchGroup(channelId);
      const tags = await this.groupClient.fetchTags();
      await this.userReviewClient.createUserReviewFromPostMessage(
        user,
        reviewedUser.id,
        postMessage,
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
    await this.bulkSave(interaction.guild, guildName, categoryName, limit);
  }
}
