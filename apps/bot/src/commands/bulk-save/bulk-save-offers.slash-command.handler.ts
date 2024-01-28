import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { BulkSaveSlashCommandHandler } from './bulk-save.slash-command.handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class BulkSaveOffersSlashCommandHandler extends BulkSaveSlashCommandHandler {
  constructor(
    protected readonly dealClient: OfferClient,
  ) {
    super(dealClient);
  }

  @SlashCommand({ name: 'bulk-save-offers', description: 'Bulk Save Offers' })
  public async onBuckSaveOffers(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, 'wts', limit);
  }
}
