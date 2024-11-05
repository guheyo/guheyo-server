import { Inject, Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadChannelGuard } from '@app/bot/apps/thread/guards/thread-channel.guard';
import { ThreadClient } from '@app/bot/apps/thread/clients/thread.client';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { PostMessageGuard } from '@app/bot/apps/post/guards/post-message.guard';
import { DiscordConfigService } from '@app/bot/shared/discord/discord.config.service';
import { ParsePostFromThreadPipe } from '@app/bot/apps/thread/pipes/parse-post-from-thread.pipe';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { ParseThreadChannelFromThreadPipe } from '@app/bot/apps/thread/pipes/parse-thread-channel-from-thread.pipe';
import { DiscordThreadChannel } from '@app/bot/shared/interfaces/discord-server.interface';

@UseGuards(GroupGuard, ThreadChannelGuard, PostMessageGuard)
@Injectable()
export class ThreadCreatedHandler {
  protected readonly logger: Logger;

  protected discordManager: DiscordManager;

  @Inject()
  readonly discordConfigService: DiscordConfigService;

  constructor(private readonly threadClient: ThreadClient) {}

  @On('messageCreate')
  public async onCreateThread(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context(ParsePostFromThreadPipe)
    threadPost: ThreadPost,
    @Context(ParseThreadChannelFromThreadPipe)
    threadChannel: DiscordThreadChannel,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.threadClient.createThreadFromPost({
      user,
      threadPost,
      group,
      categorySource: threadChannel.categorySource,
    });
  }
}
