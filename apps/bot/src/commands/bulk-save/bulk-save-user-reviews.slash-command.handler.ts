import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserReviewClient } from '@app/bot/apps/user-review/clients/user-review.client';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashCommandHandler } from './bulk-save-posts.slash-command.handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewsSlashCommandHandler extends BulkSavePostsSlashCommandHandler {
  constructor(protected readonly userReviewClient: UserReviewClient) {
    super(userReviewClient);
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
