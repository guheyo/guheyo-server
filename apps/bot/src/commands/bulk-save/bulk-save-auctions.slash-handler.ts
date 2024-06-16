import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ThreadChannel } from 'discord.js';
import { AuctionClient } from '@app/bot/apps/auction/clients/auction.client';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSavePostsSlashHandler } from './bulk-save-posts.slash-handler';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveAuctionsSlashHandler extends BulkSavePostsSlashHandler {
  private readonly logger = new Logger(BulkSaveAuctionsSlashHandler.name);

  constructor(protected readonly auctionClient: AuctionClient) {
    super();
  }

  async saveThreadPost(threadPost: ThreadPost) {
    try {
      const channelId = (threadPost.starterMessage.channel as ThreadChannel).parentId;
      if (!channelId) return;

      const member = await this.discordManager.fetchMember(threadPost.starterMessage.author.id);
      const user = await this.userClient.fetchMyUser('discord', member);
      const group = await this.groupClient.fetchGroup(channelId);
      await this.auctionClient.createAuctionFromPost(user, threadPost, group);
    } catch (error: any) {
      this.logger.error(`Failed to save thread post: ${error.message}`, error.stack);
    }
  }

  @SlashCommand({
    name: 'bulk-save-auctions',
    description: 'Bulk Save Auctions',
  })
  public async onBuckSaveAuctions(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;

    const channelId = this.groupParser.discordConfigService.findAuctionChannelId(
      guildName,
      categoryName,
    );
    if (!channelId) return;

    await this.bulkSave(interaction.guild, channelId, limit);
  }
}
