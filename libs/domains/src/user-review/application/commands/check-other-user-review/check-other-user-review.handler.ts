import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { UserReviewErrorMessage } from '@lib/domains/user-review/domain/user-review.error.message';
import { UserReviewLoadPort } from '../../ports/out/user-review.load.port';
import { UserReviewSavePort } from '../../ports/out/user-review.save.port';
import { CheckOtherUserReviewCommand } from './check-other-user-review.command';

@CommandHandler(CheckOtherUserReviewCommand)
export class CheckOtherUserReviewHandler implements ICommandHandler<CheckOtherUserReviewCommand> {
  constructor(
    @Inject('UserReviewLoadPort') private loadPort: UserReviewLoadPort,
    @Inject('UserReviewSavePort') private savePort: UserReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CheckOtherUserReviewCommand): Promise<void> {
    const sourceUserReview = await this.loadPort.findById(command.sourceUserReviewId);
    if (!sourceUserReview)
      throw new ForbiddenException(UserReviewErrorMessage.USER_REVIEW_NOT_FOUND);

    const otherUserReview = await this.loadPort.findLastUserReview({
      type: command.type,
      offerId: command.offerId,
      auctionId: command.auctionId,
      userId: command.reviewedUserId,
      reviewedUserId: command.userId,
    });
    if (otherUserReview) {
      otherUserReview.matching();
      sourceUserReview.matching();
      await this.savePort.save(otherUserReview);
      await this.savePort.save(sourceUserReview);
    }
  }
}
