import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { BulkConnectUserRolesRequest } from './bulk-connect-user-roles.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkConnectUserRolesSlashHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  private readonly logger = new Logger(BulkConnectUserRolesSlashHandler.name);

  @SlashCommand({
    name: 'bulk-connect-user-roles',
    description: 'Bulk connect user roles',
  })
  public async onBulkConnectUserRoles(
    @Context() [interaction]: SlashCommandContext,
    @Options()
    { limit }: BulkConnectUserRolesRequest,
  ) {
    const { guildId } = interaction;
    if (!guildId) return interaction.reply('guild id not found');

    const members = await this.groupClient.fetchMembers(guildId, limit);
    interaction.reply(`Connect Discord roles for ${members.length} members in the database`);

    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const connectedRoleCounts = await this.userClient.bulkConnectUserRoles(userWithMembers);
    const totalConnectedRoles = connectedRoleCounts.reduce((acc, count) => acc + count, 0);

    return this.logger.log(
      `${connectedRoleCounts.length} users' ${totalConnectedRoles} roles connected`,
    );
  }
}
