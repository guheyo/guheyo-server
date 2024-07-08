import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommunityChannelGuard } from '@app/bot/apps/thread/guards/community-channel.guard';
import { CommentClient } from '@app/bot/apps/comment/clients/comment.client';
import { CommentMessageGuard } from '@app/bot/apps/comment/guards/comment-message.guard';

@UseGuards(GroupGuard, CommunityChannelGuard, CommentMessageGuard)
@Name('커스텀 키보드')
@Injectable()
export class PostCommentCreatedHandler {
  constructor(private readonly commentClient: CommentClient) {}

  @On('messageCreate')
  public async onCreatePostComment(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.commentClient.createCommentFromMessage(message, user);
  }
}
