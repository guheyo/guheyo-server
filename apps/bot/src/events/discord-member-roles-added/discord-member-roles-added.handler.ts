import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import _ from 'lodash';
import { GuildInterceptor } from '@app/bot/interceptors/guild.interceptor';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';

@UseInterceptors(GuildInterceptor)
@Injectable()
export class DiscordMemberRolesAddedHandler {
  private readonly logger = new Logger(DiscordMemberRolesAddedHandler.name);

  constructor(
    private readonly discordIdConverter: DiscordIdConverter,
    private readonly commandBus: CommandBus,
  ) {}

  @On('guildMemberRoleAdd')
  public async onAddGuildMemberRoles(@Context() [member, role]: ContextOf<'guildMemberRoleAdd'>) {
    this.commandBus.execute(
      new ConnectRolesCommand({
        id: this.discordIdConverter.toMemberId(member.id),
        roleIds: [this.discordIdConverter.toRoleId(role.id)],
      }),
    );
  }
}
