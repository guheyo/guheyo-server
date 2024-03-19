import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { pick } from 'lodash';
import { UpdateCommentCommand } from './update-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand> {
  constructor(
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateCommentCommand): Promise<void> {
    const comment = await this.loadPort.findById(command.id);
    if (!comment) throw new NotFoundException(CommentErrorMessage.COMMENT_NOT_FOUND);
    if (!comment.isAuthorized(command.authorId))
      throw new ForbiddenException(CommentErrorMessage.COMMENT_CHANGES_FROM_UNAUTHORIZED_USER);

    comment.update(pick(command, ['id', 'content']));
    await this.savePort.save(comment);
  }
}
