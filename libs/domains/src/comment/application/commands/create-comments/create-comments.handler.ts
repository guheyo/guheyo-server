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
    const existingComments = await this.prismaService.comment.findMany({
      where: {
        id: {
          in: command.commentCommands.map((commentCommand) => commentCommand.id),
        },
      },
      select: {
        id: true,
      },
    });

    // Filter out existing comments
    const newComments = command.commentCommands.filter(
      (commentCommand) =>
        !existingComments.some((existingComment) => existingComment.id === commentCommand.id),
    );

    // Create new comments
    const commentsToCreate = newComments.map(
      (commentCommand) =>
        new CommentEntity({
          ...commentCommand,
          userId: commentCommand.user.id,
        }),
    );

    // Save new comments
    await this.savePort.createMany(commentsToCreate);
  }
}
