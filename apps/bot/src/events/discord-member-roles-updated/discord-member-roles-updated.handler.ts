import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import _ from 'lodash';
import { GuildInterceptor } from '@app/bot/interceptors/guild.interceptor';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';

@UseInterceptors(GuildInterceptor)
@Injectable()
export class DiscordMemberRolesUpdatedHandler {
  private readonly logger = new Logger(DiscordMemberRolesUpdatedHandler.name);

  constructor(
    private readonly discordIdConverter: DiscordIdConverter,
    private readonly commandBus: CommandBus,
  ) {}

  @On('guildMemberUpdate')
  public async onUpdateGuildMemberRoles(
    @Context() [oldMember, newMember]: ContextOf<'guildMemberUpdate'>,
  ) {
    const oldMemberRoleIds = oldMember.roles.cache.map((role) =>
      this.discordIdConverter.toRoleId(role.id),
    );
    const newMemberRoleIds = newMember.roles.cache.map((role) =>
      this.discordIdConverter.toRoleId(role.id),
    );

    const connectedRoleIds = _.difference(newMemberRoleIds, oldMemberRoleIds);
    const disconnectedRoleIds = _.difference(oldMemberRoleIds, newMemberRoleIds);

    const memberId = this.discordIdConverter.toMemberId(newMember.id);

    if (connectedRoleIds.length > 0)
      this.commandBus.execute(
        new ConnectRolesCommand({
          id: memberId,
          roleIds: connectedRoleIds,
        }),
      );
    else if (disconnectedRoleIds.length > 0)
      this.commandBus.execute(
        new DisconnectRolesCommand({
          id: memberId,
          roleIds: disconnectedRoleIds,
        }),
      );
  }
}
