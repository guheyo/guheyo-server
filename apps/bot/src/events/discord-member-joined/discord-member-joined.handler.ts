import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { ParseUserPipe } from '@app/bot/apps/user/pipes/parse-user.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';

@UseGuards(GuildGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  @On('guildMemberAdd')
  public async onJoin(@Context(ParseUserPipe) user: SimpleUser) {
    this.logger.log(`${user.username}<@${user.id}> joined discord server`);
  }
}
