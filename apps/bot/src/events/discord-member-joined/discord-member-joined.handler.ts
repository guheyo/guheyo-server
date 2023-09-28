import { GuildMemberEventGuard } from '@app/bot/guards/guild-member.event.guard';
import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { CreateJoinedUserCommand } from '@lib/domains/user/application/commands/create-joined-user/create-joined-user.command';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';

@UseGuards(GuildMemberEventGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly discordIdConverter: DiscordIdConverter,
  ) {}

  @On('guildMemberAdd')
  public async onJoin(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    this.commandBus.execute(
      new CreateJoinedUserCommand({
        username: member.user.username,
        avatarURL: member.user.avatarURL() || undefined,
        socialAccountId: this.discordIdConverter.toSocialAccountId(member.user.id),
        provider: 'discord',
        socialId: member.user.id,
        guildId: this.discordIdConverter.toGuildId(member.guild.id),
        memberId: this.discordIdConverter.toMemberId(member.user.id),
        roleIds: [],
      }),
    );
    this.logger.log(`${member.user.username}<@${member.user.id}> joined discord server`);
  }
}
