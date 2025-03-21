import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { Collection, Role } from 'discord.js';
import { AssignUserRoleRequest } from './assign-user-role.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class AssignUserRoleSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  private readonly logger = new Logger(AssignUserRoleSlashHandler.name);

  @SlashCommand({
    name: 'assign-user-role',
    description: 'Assign user role',
  })
  public async onAssignUserRoles(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { memberId, roleId }: AssignUserRoleRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const user = await this.userClient.findMyUser('discord', memberId);
    if (!user) return interaction.reply(`user<@${memberId}> not found`);

    const role = await guild.roles.fetch(roleId);
    if (!role) return interaction.reply(`role<@&${roleId}> not found`);

    await this.userClient.connectRoles(user.id, [role.name]);

    const message1 = `Assigned member<@${memberId}> role<${role.name}> in DB`;
    this.logger.log(message1);

    const member = await guild.members.fetch({ user: memberId });
    if (!member) return interaction.reply(message1);
    const userWithMember = { user, member };

    const roleCollection = new Collection<string, Role>();
    roleCollection.set(roleId, role);

    await this.userClient.applyUserRoles([userWithMember], roleCollection);

    const message2 = `Assigned member<@${memberId}> role<${role.name}> in DB & Discord`;
    this.logger.log(message2);
    return interaction.reply(message2);
  }
}
