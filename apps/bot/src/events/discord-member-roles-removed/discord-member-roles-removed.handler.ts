import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/guards/guild.guard';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';

@UseGuards(GuildGuard)
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
    await this.commandBus.execute(
      new DisconnectRolesCommand({
        id: this.discordIdConverter.convertIdUsingGuildNamespace(member.id),
        roleIds: [this.discordIdConverter.convertIdUsingGuildNamespace(role.id)],
      }),
    );
  }
}
