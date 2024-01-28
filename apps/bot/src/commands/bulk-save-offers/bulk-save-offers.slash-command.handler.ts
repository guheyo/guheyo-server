import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { BulkSaveOffersRequest } from './bulk-save-offers.request';
import { GuildParser } from '@app/bot/apps/guild/parsers/guild.parser';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { GuildClient } from '@app/bot/apps/guild/clients/guild.client';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class BulkSaveOffersSlashCommandHandler {
  constructor(
    private readonly guildParser: GuildParser,
    private readonly guildClient: GuildClient,
    private readonly userClient: UserClient,
    private readonly offerClient: OfferClient,
  ) {}

  @SlashCommand({ name: 'bulk-save-offers', description: 'Bulk Save Offers' })
  public async onBuckSaveOffers(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, limit }: BulkSaveOffersRequest,
  ) {
    if (!interaction.guild) return;

    const discordGuild = interaction.guild;
    const wtsChannelIds = this.guildParser.discordConfigService.findMarketChannelIds(
      guildName,
      'wts',
    );
    const discordGuildManager = new DiscordManager(discordGuild);
    const messages = await discordGuildManager.fetchMessages(wtsChannelIds, limit);
    messages.map(async (message) => {
      const member = await discordGuildManager.fetchMember(discordGuild!, message.author);
      const user = await this.userClient.fetchSimpleUser('discord', member);
      const guild = await this.guildClient.fetchGuildFromMessage(message);
      await this.offerClient.createDealFromMessage(user.id, message, guild);
    });
  }
}
