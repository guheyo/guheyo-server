import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { FindMembersByRolesRequest } from './find-members-by-roles.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class FindMembersByRolesSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  private readonly logger = new Logger(FindMembersByRolesSlashHandler.name);

  @SlashCommand({
    name: 'find-members-by-roles',
    description: 'Find members by roles',
  })
  public async onFindMembersByRoles(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { limit, role0, role1, role2 }: FindMembersByRolesRequest,
  ) {
    const { guildId } = interaction;
    if (!guildId) return interaction.reply('guild id not found');

    const roles = [role0, role1, role2].filter((role) => !!role);
    const roleNamesMessage = this.userClient.userParser.parseRoleNamesMessage(roles);

    const members = await this.groupClient.fetchMembers(guildId, limit);
    const membersHasRoles = await this.userClient.filterMembersByRoles(members, roles);

    const MAX_MEMBERS_DISPLAY = 50;
    const displayedMembers = membersHasRoles.slice(0, MAX_MEMBERS_DISPLAY);
    const memberMentions = this.userClient.userParser.parseMemberMentionsMessage(displayedMembers);

    const totalMembers = membersHasRoles.length;
    const remainingMembers =
      totalMembers > MAX_MEMBERS_DISPLAY ? `, remain ${totalMembers - MAX_MEMBERS_DISPLAY}` : '';

    const logMessage = `[${roleNamesMessage}] total ${totalMembers}${remainingMembers} members: ${memberMentions}`;
    try {
      interaction.reply(logMessage);
    } catch (error: any) {
      this.logger.error('Error replying to interaction:', error);
    }
    return this.logger.log(logMessage);
  }
}
