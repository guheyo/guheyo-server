import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { pick } from 'lodash';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UpdateCommentCommand } from './update-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { CommentResponse } from '../../dtos/comment.response';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler extends PrismaCommandHandler<
  UpdateCommentCommand,
  CommentResponse
> {
  constructor(
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(CommentResponse);
  }

  async execute(command: UpdateCommentCommand): Promise<CommentResponse> {
    const comment = await this.loadPort.findById(command.id);
    if (!comment) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);
    if (!comment.isAuthorized(command.authorId))
      throw new ForbiddenException(CommentErrorMessage.COMMENT_CHANGES_FROM_UNAUTHORIZED_USER);

    comment.update(pick(command, ['id', 'content']));
    await this.savePort.save(comment);
    return this.parseResponse(comment);
  }
}
