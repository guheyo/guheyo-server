import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { GuildInterceptor } from '@app/bot/interceptors/guild.interceptor';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';

@UseInterceptors(GuildInterceptor)
@Injectable()
export class DiscordMemberRolesRemovedHandler {
  private readonly logger = new Logger(DiscordMemberRolesRemovedHandler.name);

  constructor(
    private readonly discordIdConverter: DiscordIdConverter,
    private readonly commandBus: CommandBus,
  ) {}

  @On('guildMemberRoleRemove')
  public async onRemovedGuildMemberRoles(
    @Context() [member, role]: ContextOf<'guildMemberRoleRemove'>,
  ) {
    this.commandBus.execute(
      new DisconnectRolesCommand({
        id: this.discordIdConverter.toMemberId(member.id),
        roleIds: [this.discordIdConverter.toRoleId(role.id)],
      }),
    );
  }
}
