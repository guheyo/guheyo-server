import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { BulkSaveSlashCommandHandler } from './bulk-save.slash-command.handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkSaveSwapsSlashCommandHandler extends BulkSaveSlashCommandHandler {
  constructor(protected readonly dealClient: SwapClient) {
    super(dealClient);
  }

  @SlashCommand({ name: 'bulk-save-swaps', description: 'Bulk Save Swaps' })
  public async onBuckSaveSwaps(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, 'wtt', limit);
  }
}
