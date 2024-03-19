import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { omit } from 'lodash';
import { CreateCommentCommand } from './create-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCommentCommand): Promise<void> {
    const comment = this.publisher.mergeObjectContext(new CommentEntity(omit(command, ['refId'])));
    comment.setRefId(command.refId);
    comment.create(command.refId);
    await this.savePort.create(comment);
    comment.commit();
  }
}
