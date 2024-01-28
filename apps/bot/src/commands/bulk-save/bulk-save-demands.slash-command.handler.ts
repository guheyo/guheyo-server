import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { BulkSaveSlashCommandHandler } from './bulk-save.slash-command.handler';
import { BulkSaveRequest } from './bulk-save.request';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class BulkSaveDemandsSlashCommandHandler extends BulkSaveSlashCommandHandler {
  constructor(
    protected readonly dealClient: DemandClient,
  ) {
    super(dealClient);
  }

  @SlashCommand({ name: 'bulk-save-demands', description: 'Bulk Save Demands' })
  public async onBuckSaveDemands(
    @Context() [interaction]: SlashCommandContext,
    @Options() { guildName, limit }: BulkSaveRequest,
  ) {
    if (!interaction.guild) return;
    await this.bulkSave(interaction.guild, guildName, 'wtb', limit);
  }
}
