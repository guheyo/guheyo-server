import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { DealClient } from '@app/bot/apps/deal/clients/deal.client';
import { Guild, Message } from 'discord.js';
import { MarketChannelType } from '@app/bot/shared/types/market-channel.type';

@Injectable()
export abstract class BulkSaveSlashCommandHandler {
  @Inject()
  protected readonly groupParser: GroupParser;

  @Inject()
  protected readonly groupClient: GroupClient;

  @Inject()
  protected readonly userClient: UserClient;

  protected discordManager: DiscordManager;

  constructor(protected readonly dealClient: DealClient) {}

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
    await this.bulkSaveMessages(messages, discordGuild);
  }

  async bulkSaveMessages(messages: Message[], discordGuild: Guild) {
    return messages.map(async (message) => this.saveMessage(message, discordGuild));
  }

  async saveMessage(message: Message, discordGuild: Guild) {
    const member = await this.discordManager.fetchMember(discordGuild, message.author);
    const user = await this.userClient.fetchSimpleUser('discord', member);
    const group = await this.groupClient.fetchGroupFromMessage(message);
    try {
      await this.dealClient.createDealFromMessage(user.id, message, group);
    } catch (e) {
      console.log(e);
    }
  }
}
