import { Inject, Injectable } from '@nestjs/common';
import { ThreadChannel } from 'discord.js';
import { BidClient } from '@app/bot/apps/auction/clients/bid.client';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import {
  BidMessageWithUser,
  MessageWithSocialIdAndPrice,
} from '@app/bot/apps/auction/interfaces/bid.interfaces';
import { BulkSaveRequest } from './bulk-save.request';
import { BulkSaveCommentsSlashHandler } from './bulk-save-comments.slash-handler';

@Injectable()
export class BulkSaveBidsSlashHandler extends BulkSaveCommentsSlashHandler {
  @Inject()
  protected readonly bidClient: BidClient;

  constructor() {
    super(BulkSaveBidsSlashHandler.name);
  }

  async saveThread(threadChannel: ThreadChannel) {
    try {
      const messageWithEmbeds = await this.fetchMessagesWithEmbeds(threadChannel);
      const messageWithSocialIdAndPrices =
        this.bidClient.bidParser.extractSocialIdAndPricesFromMessages(messageWithEmbeds);
      const bidMessageWithUsers = await this.fetchBidMessageWithUsers(messageWithSocialIdAndPrices);

      await this.bidClient.createBidsFromBidMessageWithUsers(
        threadChannel,
        bidMessageWithUsers, // No need to splice since it's all embed messages
      );
    } catch (e: any) {
      this.logger.error(`Error in saveThread for threadChannel ID: ${threadChannel.id}`, e.stack);
    }
  }

  async fetchBidMessageWithUsers(
    messageWithSocialIdAndPrices: MessageWithSocialIdAndPrice[],
  ): Promise<BidMessageWithUser[]> {
    const results = await Promise.all(
      messageWithSocialIdAndPrices.map(async (messageWithSocialIdAndPrice) => {
        const discordUser = await this.userClient.fetchUser(messageWithSocialIdAndPrice.socialId);
        const user = await this.userClient.fetchMyUser('discord', discordUser);
        return {
          message: messageWithSocialIdAndPrice.message,
          price: messageWithSocialIdAndPrice.price,
          user,
        };
      }),
    );
    return results;
  }

  async bulkSaveThreads(threadChannels: ThreadChannel[]) {
    this.logger.log(`Total thread channels: ${threadChannels.length}`);
    return threadChannels.map(async (threadChannel) => this.saveThread(threadChannel));
  }

  @SlashCommand({
    name: 'bulk-save-bids',
    description: 'Bulk Save Bids',
  })
  public async onBuckSaveBids(
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
