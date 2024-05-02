import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GroupGuard)
@Injectable()
export class DiscordMemberRolesRemovedHandler {
  private readonly logger = new Logger(DiscordMemberRolesRemovedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('guildMemberRoleRemove')
  public async onRemovedGuildMemberRoles(
    @Context() [discordMember, role]: ContextOf<'guildMemberRoleRemove'>,
  ) {
    const user = await this.userClient.fetchMyUser('discord', discordMember);
    await this.userClient.disconnectRoles(user.id, [role.name]);
  }
}
