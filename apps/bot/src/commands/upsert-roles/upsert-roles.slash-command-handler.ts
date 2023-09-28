import { GuildSlashCommandGuard } from '@app/bot/guards/guild.slash-command.guard';
import { OwnerSlashCommandGuard } from '@app/bot/guards/owner.slash-command.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { v5 as uuid5 } from 'uuid';
import { CommandBus } from '@nestjs/cqrs';

@UseGuards(GuildSlashCommandGuard)
@UseGuards(OwnerSlashCommandGuard)
@Injectable()
export class UpsertRolesSlashCommandHandler {
  constructor(
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  @SlashCommand({ name: 'upsert-roles', description: 'Upsert roles' })
  async upsertRoles(@Context() [interaction]: SlashCommandContext) {
    const roleManager = interaction.guild?.roles;
    if (!roleManager) return interaction.reply('Role Manager is not found');

    const highestRole = roleManager.highest;
    const upsertRoleInputs = roleManager.cache.map((role) => ({
      id: uuid5(role.id, this.configService.get('namespace.guild')!),
      ..._.pick(role, ['name', 'hexColor']),
      rank: highestRole.position - role.position,
      guildId: uuid5(roleManager.guild.id, this.configService.get('namespace.discord')!),
    }));
    const command = new UpsertRolesCommand({
      upsertRoleInputs,
    });
    this.commandBus.execute(command);
    return interaction.reply('Roles Upserted');
  }
}
