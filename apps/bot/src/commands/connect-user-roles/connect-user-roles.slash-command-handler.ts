import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ConnectUserRolesRequest } from './connect-user-roles.request';

@UseGuards(GroupGuard, OwnerGuard)
@Injectable()
export class ConnectUserRolesSlashCommandHandler {
  constructor(private readonly userClient: UserClient) {}

  @SlashCommand({ name: 'connect-user-roles', description: 'Connect user roles' })
  public async onConnectUserRoles(
    @Context() [interaction]: SlashCommandContext,
    @Options() { discordMember }: ConnectUserRolesRequest,
  ) {
    const user = await this.userClient.fetchMyUser('discord', discordMember);
    const roleNames = await this.userClient.connectUserRoles(user, discordMember);
    interaction.reply(`${user.username}<@${roleNames}> roles connected`);
  }
}
