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
    // Prevent Error BASE_TYPE_MAX_LENGTH: 2000 length
    const memberMentionsMessage = this.userClient.userParser.parseMemberMensionsMessage(
      membersHasRoles.slice(0, 50),
    );

    const logMessage = `[${roleNamesMessage}] total ${membersHasRoles.length} ${
      membersHasRoles.length > 50 ? `, remain ${membersHasRoles.length - 50}` : ''
    } members: ${memberMentionsMessage}`;
    interaction.reply(logMessage);
    return this.logger.log(logMessage);
  }
}
