import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ApplySocialRoleRequest } from './apply-social-role.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class ApplySocialRoleSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  public readonly logger = new Logger(ApplySocialRoleSlashHandler.name);

  @SlashCommand({
    name: 'apply-social-role',
    description: 'Apply social role',
  })
  public async onApplySocialRole(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { provider, limit }: ApplySocialRoleRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const roles = await guild.roles.fetch();
    const socialRole = this.userClient.findSocialRole(roles, provider);
    if (!socialRole) return interaction.reply(`${provider} role not exists in guild`);

    const members = await this.groupClient.fetchMembers(guild.id, limit);
    interaction.reply(`Apply ${members.length} members' ${provider} role`);

    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const appliedmembers = await this.userClient.applyRole(userWithMembers, provider, socialRole);
    return this.logger.log(`${appliedmembers.length} members' ${provider} role applied`);
  }
}
