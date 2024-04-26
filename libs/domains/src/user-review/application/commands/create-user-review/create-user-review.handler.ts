import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { UserReviewErrorMessage } from '@lib/domains/user-review/domain/user-review.error.message';
import { UserReviewEntity } from '@lib/domains/user-review/domain/user-review.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { TagEntity } from '@lib/domains/tag/domain/tag.entity';
import { UserReviewLoadPort } from '../../ports/out/user-review.load.port';
import { UserReviewSavePort } from '../../ports/out/user-review.save.port';
import { CreateUserReviewCommand } from './create-user-review.command';

@CommandHandler(CreateUserReviewCommand)
export class CreateUserReviewHandler implements ICommandHandler<CreateUserReviewCommand> {
  constructor(
    @Inject('UserReviewLoadPort') private loadPort: UserReviewLoadPort,
    @Inject('UserReviewSavePort') private savePort: UserReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserReviewCommand): Promise<void> {
    const lastReview = await this.loadPort.findLastUserReview({
      type: command.type,
      offerId: command.offerId,
      auctionId: command.auctionId,
      userId: command.user.id,
      reviewedUserId: command.reviewedUserId,
    });
    if (lastReview) throw new ForbiddenException(UserReviewErrorMessage.USER_REVIEW_ALREADY_EXIST);

    const review = this.publisher.mergeObjectContext(
      new UserReviewEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
          tags: command.post.tagIds.map((id) => new TagEntity({ id })),
        }),
      }),
    );

    review.create();
    await this.savePort.create(review);
    review.commit();
  }
}
