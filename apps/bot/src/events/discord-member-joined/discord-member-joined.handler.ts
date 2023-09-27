import { GuildMemberEventGuard } from '@app/bot/guards/guild-member.event.guard';
import { CreateJoinedUserCommand } from '@lib/domains/user/application/commands/create-joined-user/create-joined-user.command';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { v5 as uuid5 } from 'uuid';

@UseGuards(GuildMemberEventGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {}

  @On('guildMemberAdd')
  public async onJoin(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    this.commandBus.execute(
      new CreateJoinedUserCommand({
        username: member.user.username,
        avatarURL: member.user.avatarURL() || undefined,
        socialAccountId: uuid5(member.user.id, this.configService.get('namespace.discord')!),
        provider: 'discord',
        socialId: member.user.id,
        guildId: uuid5(member.guild.id, this.configService.get('namespace.discord')!),
        memberId: uuid5(member.id, this.configService.get('namespace.guild')!),
        roleIds: [],
      }),
    );
    this.logger.log(`${member.user.username}<@${member.user.id}> joined discord server`);
  }
}
