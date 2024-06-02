import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { SwapClient } from '@app/bot/apps/offer/swap/clients/swap.client';
import { BulkSaveOffersSlashHandler } from './bulk-save-offers.slash-handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveSwapsSlashHandler extends BulkSaveOffersSlashHandler {
  constructor(protected readonly offerClient: SwapClient) {
    super(offerClient);
  }

  @SlashCommand({ name: 'bulk-save-swaps', description: 'Bulk Save Swaps' })
  public async onBuckSaveSwaps(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, categoryName, 'wtt', limit);
  }
}
