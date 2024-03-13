import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { CreateCommentCommand } from './create-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(@Inject('CommentSavePort') private savePort: CommentSavePort) {}

  async execute(command: CreateCommentCommand): Promise<void> {
    await this.savePort.create(new CommentEntity(command));
  }
}
