import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSaveCommentsSlashHandler } from './bulk-save-comments.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveUserReviewCommentsSlashHandler extends BulkSaveCommentsSlashHandler {
  @SlashCommand({
    name: 'bulk-save-user-reviews-comments',
    description: 'Bulk Save UserReviews Comments',
  })
  public async onBuckSaveUserReviewComments(
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
