import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { DiscordIdConverter } from '@app/bot/shared/converters/discord-id-converter';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberRolesAddedHandler {
  private readonly logger = new Logger(DiscordMemberRolesAddedHandler.name);

  constructor(
    private readonly discordIdConverter: DiscordIdConverter,
    private readonly commandBus: CommandBus,
  ) {}

  @On('guildMemberRoleAdd')
  public async onAddGuildMemberRoles(@Context() [member, role]: ContextOf<'guildMemberRoleAdd'>) {
    await this.commandBus.execute(
      new ConnectRolesCommand({
        id: this.discordIdConverter.convertIdUsingGuildNamespace(member.id),
        roleIds: [this.discordIdConverter.convertIdUsingDiscordNamespace(role.id)],
      }),
    );
  }
}