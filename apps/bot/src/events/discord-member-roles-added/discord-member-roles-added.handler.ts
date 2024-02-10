import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Context, ContextOf, On } from 'necord';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GroupGuard)
@Injectable()
export class DiscordMemberRolesAddedHandler {
  private readonly logger = new Logger(DiscordMemberRolesAddedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('guildMemberRoleAdd')
  public async onAddGuildMemberRoles(@Context() [member, role]: ContextOf<'guildMemberRoleAdd'>) {
    const user = await this.userClient.fetchSimpleUser('discord', member);
    await this.userClient.connectRoles(user.id, [role.name]);
  }
}
