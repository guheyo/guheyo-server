import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberRolesRemovedHandler {
  private readonly logger = new Logger(DiscordMemberRolesRemovedHandler.name);

  constructor(
    private readonly userClient: UserClient,
  ) {}

  @On('guildMemberRoleRemove')
  public async onRemovedGuildMemberRoles(
    @Context() [member, role]: ContextOf<'guildMemberRoleRemove'>,
  ) {
    await this.userClient.disconnectRoles(member.id, role.id);
  }
}
