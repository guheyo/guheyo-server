import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateCommentsCommand } from './create-comments.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { CommentWithAuthorResponse } from '../../dtos/comment-with-author.response';

@CommandHandler(CreateCommentsCommand)
export class CreateCommentsHandler extends PrismaCommandHandler<
  CreateCommentsCommand,
  CommentWithAuthorResponse
> {
  constructor(
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(CommentWithAuthorResponse);
  }

  async execute(command: CreateCommentsCommand): Promise<void> {
    await this.savePort.createMany(
      command.commentCommands.map(
        (commentCommand) =>
          new CommentEntity({
            ...commentCommand,
            userId: commentCommand.user.id,
          }),
      ),
    );
  }
}
