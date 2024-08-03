import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BulkSavePostRequest } from './bulk-save-post.request';
import { BulkSaveCommentsSlashHandler } from './bulk-save-comments.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveAuctionCommentsSlashHandler extends BulkSaveCommentsSlashHandler {
  constructor() {
    super(BulkSaveAuctionCommentsSlashHandler.name);
  }

  @SlashCommand({
    name: 'bulk-save-auction-comments',
    description: 'Bulk Save Auctions Comments',
  })
  public async onBuckSaveAuctionComments(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, channelName, limit }: BulkSavePostRequest,
  ) {
    if (!interaction.guild) return;

    const channelId = this.groupParser.discordConfigService.findAuctionChannelId(
      guildName,
      channelName,
    );
    if (!channelId) return;

    await this.bulkSave(interaction.guild, channelId, limit);
  }
}
