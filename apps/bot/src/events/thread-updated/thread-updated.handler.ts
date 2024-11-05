import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadChannelGuard } from '@app/bot/apps/thread/guards/thread-channel.guard';
import { ThreadClient } from '@app/bot/apps/thread/clients/thread.client';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { PostMessageGuard } from '@app/bot/apps/post/guards/post-message.guard';
import { ParsePostFromThreadPipe } from '@app/bot/apps/thread/pipes/parse-post-from-thread.pipe';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';

@UseGuards(GroupGuard, ThreadChannelGuard, PostMessageGuard)
@Injectable()
export class ThreadUpdatedHandler {
  protected readonly logger: Logger;

  protected discordManager: DiscordManager;

  constructor(private readonly threadClient: ThreadClient) {}

  @On('messageUpdate')
  public async onUpdateThread(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParsePostFromThreadPipe)
    threadPost: ThreadPost,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    await this.threadClient.updateThreadFromPost(user, threadPost);
  }
}
