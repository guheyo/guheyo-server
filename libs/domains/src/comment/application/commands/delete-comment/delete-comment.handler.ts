import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DeleteCommentCommand } from './delete-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { DeleteCommentResult } from '../../dtos/delete-comment.result';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler extends PrismaCommandHandler<
  DeleteCommentCommand,
  DeleteCommentResult
> {
  constructor(
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(DeleteCommentResult);
  }

  async execute(command: DeleteCommentCommand): Promise<DeleteCommentResult> {
    const comment = await this.loadPort.findById(command.id);
    if (!comment) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);
    if (!comment.isAuthorized(command.user.id))
      throw new ForbiddenException(
        CommentErrorMessage.COMMENT_DELETE_COMMAND_FROM_UNAUTHORIZED_USER,
      );

    await this.savePort.delete(comment);
    return this.parseResponse({
      id: comment.id,
    });
  }
}
