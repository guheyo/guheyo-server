import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ApplySocialAuthRoleRequest } from './apply-social-auth-role.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class ApplySocialAuthRoleSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  public readonly logger = new Logger(ApplySocialAuthRoleSlashHandler.name);

  @SlashCommand({
    name: 'apply-social-auth-role',
    description: 'Apply social auth role',
  })
  public async onApplySocialAuthRole(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { provider, limit }: ApplySocialAuthRoleRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const members = await this.groupClient.fetchMembers(guild.id, limit);
    interaction.reply(`Apply ${members.length} members' ${provider} auth roles`);

    const roles = await guild.roles.fetch();
    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const appliedmembers = await this.userClient.applySocialAuthRole(
      userWithMembers,
      provider,
      roles,
    );
    return this.logger.log(`${appliedmembers.length} members' ${provider} auth role applied`);
  }
}
