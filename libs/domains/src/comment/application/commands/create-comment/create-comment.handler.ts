import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { CreateCommentCommand } from './create-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCommentCommand): Promise<void> {
    if (command.userId !== command.user.id)
      throw new ForbiddenException(
        CommentErrorMessage.CREATE_COMMENT_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const comment = this.publisher.mergeObjectContext(new CommentEntity(command));
    await this.savePort.create(comment);
    comment.commit();
  }
}
