import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { BuyClient } from '@app/bot/apps/offer/buy/clients/buy.client';
import { BulkSaveSlashCommandHandler } from './bulk-save.slash-command.handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveBuysSlashCommandHandler extends BulkSaveSlashCommandHandler {
  constructor(protected readonly offerClient: BuyClient) {
    super(offerClient);
  }

  @SlashCommand({ name: 'bulk-save-demands', description: 'Bulk Save Demands' })
  public async onBuckSaveDemands(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, categoryName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, categoryName, 'wtb', limit);
  }
}
