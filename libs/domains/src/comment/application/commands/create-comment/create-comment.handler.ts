import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { CommentErrorMessage } from '@lib/domains/comment/domain/comment.error.message';
import { COMMENT } from '@lib/domains/comment/domain/comment.constants';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
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
    const post = await this.prismaService.post.findUnique({
      where: {
        id: command.postId,
      },
      select: {
        id: true,
      },
    });
    if (!post) throw new NotFoundException(PostErrorMessage.POST_NOT_FOUND);

    const comment = this.publisher.mergeObjectContext(
      new CommentEntity({
        ...command,
        userId: command.user.id,
        userAgent: command.userAgent,
      }),
    );
    await this.savePort.create(comment);
    comment.create();
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

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: COMMENT,
        refId: comment.id,
      },
      orderBy: {
        position: 'asc',
      },
    });

    await GraphqlPubSub.publish(parseCommentCreatedTriggerName(newComment.postId), {
      commentCreated: {
        ...newComment,
        images,
        reactions: [],
      },
    });
  }
}
