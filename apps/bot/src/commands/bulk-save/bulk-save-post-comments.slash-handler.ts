import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSaveCommentsSlashHandler } from './bulk-save-comments.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSavePostCommentsSlashHandler extends BulkSaveCommentsSlashHandler {
  constructor() {
    super(BulkSavePostCommentsSlashHandler.name);
  }

  @SlashCommand({
    name: 'bulk-save-post-comments',
    description: 'Bulk Save Post Comments',
  })
  public async onBuckSaveUserReviewComments(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;

    const channel = this.groupParser.discordConfigService.findThreadChannel(
      guildName,
      categoryName,
    );
    if (!channel) return;

    await this.bulkSave(interaction.guild, channel.id, limit);
  }
}
