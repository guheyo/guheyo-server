import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { CreateCommentCommand } from './create-comment.command';
import { CommentSavePort } from '../../ports/out/comment.save.port';
import { CommentLoadPort } from '../../ports/out/comment.load.port';
import { CommentWithAuthorResponse } from '../../dtos/comment-with-author.response';
import { parseCommentCreatedTriggerName } from '../../subscriptions/comment-created/parse-comment-created-trigger-name';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler extends PrismaCommandHandler<
  CreateCommentCommand,
  CommentWithAuthorResponse
> {
  constructor(
    @Inject('CommentSavePort') private savePort: CommentSavePort,
    @Inject('CommentLoadPort') private loadPort: CommentLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(CommentWithAuthorResponse);
  }

  async execute(command: CreateCommentCommand): Promise<void> {
    const comment = this.publisher.mergeObjectContext(
      new CommentEntity({
        ...command,
        userId: command.user.id,
      }),
    );
    await this.savePort.create(comment);
    comment.commit();

    const newComment = await this.prismaService.comment.findUnique({
      where: {
        id: comment.id,
      },
      include: {
        user: {
          include: {
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    if (!newComment) throw new ForbiddenException(CommentErrorMessage.COMMENT_CREATION_FAILED);

    await GraphqlPubSub.publish(parseCommentCreatedTriggerName(newComment.postId), {
      commentCreated: {
        ...newComment,
        reactions: [],
      },
    });
  }
}
