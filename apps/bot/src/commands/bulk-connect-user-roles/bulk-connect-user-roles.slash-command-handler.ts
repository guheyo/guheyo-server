import { Injectable, UseGuards } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { GroupClient } from '@app/bot/apps/group/clients/group.client';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class BulkConnectUserRolesSlashCommandHandler {
  constructor(
    private readonly groupClient: GroupClient,
    private readonly userClient: UserClient,
  ) {}

  @SlashCommand({
    name: 'bulk-connect-user-roles',
    description: 'Bulk connect user roles',
  })
  public async onBulkConnectUserRoles(@Context() [interaction]: SlashCommandContext) {
    const { guildId } = interaction;
    if (!guildId) return interaction.reply('guild id not found');

    const members = await this.groupClient.fetchMembers(guildId);
    const userWithMembers = await this.userClient.fetchMyUserWithMembers('discord', members);
    const connectedUserCount = await this.userClient.bulkConnectUserRoles(userWithMembers);
    return interaction.reply(`${connectedUserCount} user's roles connected`);
  }
}
