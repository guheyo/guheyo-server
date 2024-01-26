import { Injectable, UseGuards } from '@nestjs/common';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { CommandBus } from '@nestjs/cqrs';
import { UserParser } from '@app/bot/apps/user/parsers/user.parser';

@UseGuards(GuildGuard, OwnerGuard)
@Injectable()
export class UpsertRolesSlashCommandHandler {
  constructor(
    private readonly userParser: UserParser,
    private readonly commandBus: CommandBus,
  ) {}

  @SlashCommand({ name: 'upsert-roles', description: 'Upsert roles' })
  async upsertRoles(@Context() [interaction]: SlashCommandContext) {
    const roleManager = interaction.guild?.roles;
    if (!roleManager) return interaction.reply('Role Manager is not found');

    const upsertRoleInputs = this.userParser.parseUpsertRolesInput(roleManager);
    const command = new UpsertRolesCommand({
      upsertRoleInputs,
    });
    await this.commandBus.execute(command);
    return interaction.reply('Roles Upserted');
  }
}
