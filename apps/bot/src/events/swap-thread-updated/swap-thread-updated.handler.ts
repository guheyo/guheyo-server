import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { SwapClient } from '@app/bot/apps/offer/swap/clients/swap.client';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { ParsePostFromThreadPipe } from '@app/bot/apps/thread/pipes/parse-post-from-thread.pipe';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wtt')
@Injectable()
export class SwapThreadUpdatedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageUpdate')
  public async onUpdateSwapMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context(ParsePostFromThreadPipe)
    threadPost: ThreadPost,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    await this.swapClient.updateOfferFromThread({
      user,
      group,
      threadTitle: threadPost.threadChannel.name,
      categoryName: threadPost.tagNames[0],
      startMessage: threadPost.starterMessage,
    });
  }
}
