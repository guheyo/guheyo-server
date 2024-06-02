import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BuyClient } from '@app/bot/apps/offer/buy/clients/buy.client';
import { BulkSaveOffersSlashHandler } from './bulk-save-offers.slash-handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveBuysSlashHandler extends BulkSaveOffersSlashHandler {
  constructor(protected readonly offerClient: BuyClient) {
    super(offerClient);
  }

  @SlashCommand({ name: 'bulk-save-buys', description: 'Bulk Save Buys' })
  public async onBuckSaveDemands(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, categoryName, 'wtb', limit);
  }
}
