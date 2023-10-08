import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { UserClient } from '@app/bot/apps/user/user.client';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('guildMemberAdd')
  public async onJoin(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    const userId = await this.userClient.createUserFromDiscord(member);
    this.logger.log(`${member.user.username}<@${userId}> joined discord server`);
  }
}
