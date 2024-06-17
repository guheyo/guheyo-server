import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { Guild, Message } from 'discord.js';
import { MarketChannelType } from '@app/bot/shared/types/market-channel.type';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { PostClient } from '@app/bot/apps/post/clients/post.client';

@Injectable()
export abstract class BulkSaveOffersSlashHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  @Inject()
  protected readonly postClient: PostClient;

  protected discordManager: DiscordManager;

  constructor(protected readonly offerClient: OfferClient) {}

  async bulkSave(
    discordGuild: Guild,
    guildName: string,
    categoryName: string,
    marketChannelType: MarketChannelType,
    limit: number,
  ) {
    let channelIds: string[];
    if (categoryName === 'all') {
      channelIds = this.groupParser.discordConfigService.findMarketChannelIds(
        guildName,
        marketChannelType,
      );
    } else {
      const channelId = this.groupParser.discordConfigService.findMarketChannelId(
        guildName,
        marketChannelType,
        categoryName,
      );
      channelIds = channelId ? [channelId] : [];
    }
    this.discordManager = new DiscordManager(discordGuild);
    const messages = await this.discordManager.fetchMessagesFromChannels(channelIds, limit);
    const nonExistingMessages = await this.postClient.findNonExistingMessages(messages);
    await this.bulkSaveMessages(nonExistingMessages, discordGuild);
  }

  async bulkSaveMessages(messages: Message[], discordGuild: Guild) {
    return messages.map(async (message) => this.saveMessage(message, discordGuild));
  }

  async saveMessage(message: Message, discordGuild: Guild) {
    try {
      const user = await this.userClient.fetchMyUser('discord', message.author);
      const group = await this.groupClient.fetchGroup(message.channelId);
      await this.offerClient.createOfferFromMessage(user, message, group);
    } catch (e) {
      // NOTE: do nothing
      // console.log(e);
    }
  }
}
