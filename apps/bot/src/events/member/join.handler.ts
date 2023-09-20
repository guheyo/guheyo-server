import { GuildMemberEventGuard } from '@app/bot/guards/guild-member.event.guard';
import { UserjoinedEvent } from '@lib/domains/user/application/events/user-joined/user-joined.event';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { v4 as uuid4, v5 as uuid5 } from 'uuid';

@UseGuards(GuildMemberEventGuard)
@Injectable()
export class JoinHandler {
  private readonly logger = new Logger(JoinHandler.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly configService: ConfigService,
  ) {}

  @On('guildMemberAdd')
  public async onJoin(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    this.eventBus.publish(
      new UserjoinedEvent({
        userId: uuid4(),
        username: member.user.username,
        socialAccountId: uuid5(member.user.id, this.configService.get('namespace.discord')!),
        provider: 'discord',
        socialId: member.user.id,
        guildId: this.configService.get('discord.guild.id')!,
        memberId: uuid5(member.id, this.configService.get('namespace.guild')!),
        roleIds: [],
      }),
    );
    this.logger.log(`${member.user.username}<@${member.user.id}> joined discord server`);
  }
}
