import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, InternalServerErrorException } from '@nestjs/common';
import { UserReviewErrorMessage } from '@lib/domains/user-review/domain/user-review.error.message';
import { UserReviewEntity } from '@lib/domains/user-review/domain/user-review.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { USER_REVIEW } from '@lib/domains/user-review/domain/user-review.constants';
import { UserReviewLoadPort } from '../../ports/out/user-review.load.port';
import { UserReviewSavePort } from '../../ports/out/user-review.save.port';
import { CreateUserReviewCommand } from './create-user-review.command';
import { UserReviewResponse } from '../../dtos/user-review.response';

@CommandHandler(CreateUserReviewCommand)
export class CreateUserReviewHandler extends PrismaCommandHandler<
  CreateUserReviewCommand,
  UserReviewResponse
> {
  constructor(
    @Inject('UserReviewLoadPort') private loadPort: UserReviewLoadPort,
    @Inject('UserReviewSavePort') private savePort: UserReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(UserReviewResponse);
  }

  async execute(command: CreateUserReviewCommand): Promise<void> {
    if (command.offerId || command.auctionId) {
      const lastReview = await this.loadPort.findLastUserReview({
        type: command.type,
        offerId: command.offerId,
        auctionId: command.auctionId,
        userId: command.user.id,
      });
      if (lastReview)
        throw new ForbiddenException(UserReviewErrorMessage.USER_REVIEW_ALREADY_EXIST);
    }

    const image = await this.prismaService.userImage.findFirst({
      where: {
        type: USER_REVIEW,
        refId: command.id,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    await this.savePort.create(
      new UserReviewEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
          thumbnail: image?.url,
        }),
      }),
    );
    let review = await this.loadPort.findById(command.id);
    if (!review)
      throw new InternalServerErrorException(UserReviewErrorMessage.USER_REVIEW_CREATION_FAILED);

    review = this.publisher.mergeObjectContext(review);
    review.create(command.post.tagIds || []);
    review.commit();
  }
}
