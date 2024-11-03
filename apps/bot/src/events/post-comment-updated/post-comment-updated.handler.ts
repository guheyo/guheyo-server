import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadChannelGuard } from '@app/bot/apps/thread/guards/thread-channel.guard';
import { CommentClient } from '@app/bot/apps/comment/clients/comment.client';
import { CommentMessageGuard } from '@app/bot/apps/comment/guards/comment-message.guard';

@UseGuards(GroupGuard, ThreadChannelGuard, CommentMessageGuard)
@Injectable()
export class PostCommentUpdatedHandler {
  constructor(private readonly commentClient: CommentClient) {}

  @On('messageUpdate')
  public async onUpdatePostComment(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.commentClient.updateCommentFromMessage(message, user);
  }
}
