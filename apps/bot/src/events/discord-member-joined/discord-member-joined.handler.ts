import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { ParseUserPipe } from '@app/bot/apps/user/pipes/parse-user.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';

@UseGuards(GroupGuard)
@Injectable()
export class DiscordMemberJoinedHandler {
  private readonly logger = new Logger(DiscordMemberJoinedHandler.name);

  @On('guildMemberAdd')
  public async onJoin(@Context(ParseUserPipe) user: SimpleUser) {
    this.logger.log(`${user.username}<@${user.id}> joined discord server`);
  }
}
