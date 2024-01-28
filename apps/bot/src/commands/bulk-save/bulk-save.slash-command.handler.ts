import { Inject, Injectable } from '@nestjs/common';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { GuildParser } from '@app/bot/apps/guild/parsers/guild.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { GuildClient } from '@app/bot/apps/guild/clients/guild.client';
import { DealClient } from '@app/bot/apps/deal/clients/deal.client';
import { Guild, Message } from 'discord.js';
import { MarketChannelType } from '@app/bot/shared/types/market-channel.type';

@Injectable()
export abstract class BulkSaveSlashCommandHandler {
  @Inject()
  protected readonly guildParser: GuildParser;

  @Inject()
  protected readonly guildClient: GuildClient;

  @Inject()
  protected readonly userClient: UserClient;

  protected discordManager: DiscordManager;

  constructor(
    protected readonly dealClient: DealClient,
  ) {}

  async bulkSave(discordGuild: Guild, guildName: string, marketChannelType: MarketChannelType, limit: number) {
    const channelIds = this.guildParser.discordConfigService.findMarketChannelIds(
      guildName,
      marketChannelType,
    );
    this.discordManager = new DiscordManager(discordGuild);
    const messages = await this.discordManager.fetchMessages(channelIds, limit);
    await this.bulkSaveMessages(messages, discordGuild);
  }

  async bulkSaveMessages(messages: Message[], discordGuild: Guild) {
    return messages.map(async(message) => await this.saveMessage(message, discordGuild));
  }

  async saveMessage(message: Message, discordGuild: Guild) {
    const member = await this.discordManager.fetchMember(discordGuild, message.author);
    const user = await this.userClient.fetchSimpleUser('discord', member);
    const guild = await this.guildClient.fetchGuildFromMessage(message);
    try {
      await this.dealClient.createDealFromMessage(user.id, message, guild);
    } catch (e) {
      console.log(e);
    }
  }
}
