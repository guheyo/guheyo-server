import { Injectable, UseGuards } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class UpsertRolesSlashCommandHandler {
  constructor(
    private readonly userClient: UserClient,
  ) {}

  @SlashCommand({ name: 'upsert-roles', description: 'Upsert roles' })
  async upsertRoles(@Context() [interaction]: SlashCommandContext) {
    const roleManager = interaction.guild?.roles;
    if (!roleManager) return interaction.reply('Role Manager is not found');

    await this.userClient.upsertRoles(roleManager);
    return interaction.reply('Roles Upserted');
  }
}
