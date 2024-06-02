import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { FindMembersNeedingSocialRoleRequest } from './find-members-needing-social-role.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class FindMembersNeedingSocialRoleSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  private readonly logger = new Logger(FindMembersNeedingSocialRoleSlashHandler.name);

  @SlashCommand({
    name: 'find-members-needing-social-role',
    description: 'Find members needing social role',
  })
  public async onFindMembersNeedingSocialRole(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { limit, provider }: FindMembersNeedingSocialRoleRequest,
  ) {
    const { guild } = interaction;
    if (!guild) return interaction.reply('guild id not found');

    const roles = await guild.roles.fetch();
    const socialRole = this.userClient.findSocialRole(roles, provider);
    if (!socialRole) return interaction.reply(`${provider} role not exists in guild`);

    const members = await this.groupClient.fetchMembers(guild.id, limit);
    interaction.reply(`Checking ${members.length} members for ${provider} role needs`);

    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const membersNeedingRole = this.userClient.filterMembersNeedingRole(
      userWithMembers,
      provider,
      socialRole,
    );

    const memberMensionsMessage =
      this.userClient.userParser.parseMemberMensionsMessage(membersNeedingRole);
    const roleNamesMessage = this.userClient.userParser.parseRoleNamesMessage([socialRole]);
    const logMessage = `[${roleNamesMessage}] ${memberMensionsMessage}`;
    return this.logger.log(logMessage);
  }
}
