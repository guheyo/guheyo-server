import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { DeleteCommentCommand } from './delete-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { DeletedCommentResponse } from './deleted-comment.response';
import { parseCommentDeletedTriggerName } from '../../subscriptions/comment-deleted/parse-comment-deleted-trigger-name';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler extends PrismaCommandHandler<
  DeleteCommentCommand,
  DeletedCommentResponse
> {
  constructor(
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(DeletedCommentResponse);
  }

  async execute(command: DeleteCommentCommand): Promise<void> {
    const comment = await this.loadPort.findById(command.id);
    if (!comment) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);
    if (!comment.isAuthorized(command.user.id))
      throw new ForbiddenException(
        CommentErrorMessage.COMMENT_DELETE_COMMAND_FROM_UNAUTHORIZED_USER,
      );

    await this.savePort.delete(comment);

    await GraphqlPubSub.publish(parseCommentDeletedTriggerName(comment.postId), {
      commentDeleted: {
        id: comment.id,
      },
    });
  }
}
