import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { pick } from 'lodash';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { UpdateCommentCommand } from './update-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { parseCommentUpdatedTriggerName } from '../../subscriptions/comment-updated/parse-comment-updated-trigger-name';
import { UpdatedCommentResponse } from './updated-comment.response';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler extends PrismaCommandHandler<
  UpdateCommentCommand,
  UpdatedCommentResponse
> {
  constructor(
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(UpdatedCommentResponse);
  }

  async execute(command: UpdateCommentCommand): Promise<void> {
    const comment = await this.loadPort.findById(command.id);
    if (!comment) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);
    if (!comment.isAuthorized(command.user.id))
      throw new ForbiddenException(CommentErrorMessage.COMMENT_CHANGES_FROM_UNAUTHORIZED_USER);

    comment.update(pick(command, ['id', 'content']));
    await this.savePort.save(comment);

    await GraphqlPubSub.publish(parseCommentUpdatedTriggerName(comment.postId), {
      commentUpdated: {
        id: comment.id,
        updatedAt: comment.updatedAt,
        content: comment.content,
      },
    });
  }
}
