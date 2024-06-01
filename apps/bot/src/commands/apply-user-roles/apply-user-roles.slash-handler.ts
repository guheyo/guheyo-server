import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ApplyUserRolesRequest } from './apply-user-roles.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class ApplyUserRolesSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  public readonly logger = new Logger(ApplyUserRolesSlashHandler.name);

  @SlashCommand({
    name: 'apply-user-roles',
    description: 'Apply user roles',
  })
  public async onApplyUserRoles(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { limit }: ApplyUserRolesRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const members = await this.groupClient.fetchMembers(guild.id, limit);
    interaction.reply(`Apply ${members.length} members' roles`);

    const roles = await guild.roles.fetch();
    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const appliedmembers = await this.userClient.applyUserRoles(userWithMembers, roles);
    return this.logger.log(`${appliedmembers.length} members' roles applied`);
  }
}
