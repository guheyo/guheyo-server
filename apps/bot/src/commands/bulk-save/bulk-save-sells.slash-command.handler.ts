import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { SellClient } from '@app/bot/apps/offer/sell/clients/sell.client';
import { BulkSaveOffersSlashCommandHandler } from './bulk-save-offers.slash-command.handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveSellsSlashCommandHandler extends BulkSaveOffersSlashCommandHandler {
  constructor(protected readonly offerClient: SellClient) {
    super(offerClient);
  }

  @SlashCommand({ name: 'bulk-save-sells', description: 'Bulk Save Sells' })
  public async onBuckSaveOffers(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, categoryName, 'wts', limit);
  }
}
