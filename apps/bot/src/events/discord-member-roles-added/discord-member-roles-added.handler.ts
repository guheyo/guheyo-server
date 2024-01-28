import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { Context, ContextOf, On } from 'necord';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberRolesAddedHandler {
  private readonly logger = new Logger(DiscordMemberRolesAddedHandler.name);

  constructor(
    private readonly userClient: UserClient,
  ) {}

  @On('guildMemberRoleAdd')
  public async onAddGuildMemberRoles(@Context() [member, role]: ContextOf<'guildMemberRoleAdd'>) {
    await this.userClient.connectRoles(member.id, role.id);
  }
}
