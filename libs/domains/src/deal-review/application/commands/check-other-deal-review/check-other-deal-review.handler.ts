import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { DealReviewErrorMessage } from '@lib/domains/deal-review/domain/deal-review.error.message';
import { DealReviewLoadPort } from '../../ports/out/deal-review.load.port';
import { DealReviewSavePort } from '../../ports/out/deal-review.save.port';
import { CheckOtherDealReviewCommand } from './check-other-deal-review.command';

@CommandHandler(CheckOtherDealReviewCommand)
export class CheckOtherDealReviewHandler implements ICommandHandler<CheckOtherDealReviewCommand> {
  constructor(
    @Inject('DealReviewLoadPort') private loadPort: DealReviewLoadPort,
    @Inject('DealReviewSavePort') private savePort: DealReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CheckOtherDealReviewCommand): Promise<void> {
    const sourceDealReview = await this.loadPort.findById(command.sourceDealReviewId);
    if (!sourceDealReview)
      throw new ForbiddenException(DealReviewErrorMessage.DEAL_REVIEW_NOT_FOUND);

    const otherDealReview = await this.loadPort.findLastDealReview({
      refId: command.refId,
      authorId: command.revieweeId,
      revieweeId: command.authorId,
    });
    if (otherDealReview) {
      otherDealReview.matching();
      sourceDealReview.matching();
      await this.savePort.save(otherDealReview);
      await this.savePort.save(sourceDealReview);
    }
  }
}
