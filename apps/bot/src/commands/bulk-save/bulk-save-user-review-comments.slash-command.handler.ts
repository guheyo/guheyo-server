import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSaveCommentsSlashCommandHandler } from './bulk-save-comments.slash-command.handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewCommentsSlashCommandHandler extends BulkSaveCommentsSlashCommandHandler {
  @SlashCommand({
    name: 'bulk-save-user-reviews-comments',
    description: 'Bulk Save UserReviews Comments',
  })
  public async onBuckSaveUserReviewComments(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, categoryName, limit);
  }
}
