import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { UserPipe } from '@app/bot/pipes/user/user.pipe';
import { SimpleUser } from '@app/bot/apps/user/user.types';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  @On('guildMemberAdd')
  public async onJoin(@Context(UserPipe) user: SimpleUser) {
    this.logger.log(`${user.username}<@${user.id}> joined discord server`);
  }
}
