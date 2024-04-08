import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { pick } from 'lodash';
import { DealReviewEntity } from '@lib/domains/deal-review/domain/deal-review.entity';
import { DealReviewErrorMessage } from '@lib/domains/deal-review/domain/deal-review.error.message';
import { DealReviewLoadPort } from '../../ports/out/deal-review.load.port';
import { DealReviewSavePort } from '../../ports/out/deal-review.save.port';
import { CreateDealReviewCommand } from './create-deal-review.command';

@CommandHandler(CreateDealReviewCommand)
export class CreateDealReviewHandler implements ICommandHandler<CreateDealReviewCommand> {
  constructor(
    @Inject('DealReviewLoadPort') private loadPort: DealReviewLoadPort,
    @Inject('DealReviewSavePort') private savePort: DealReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateDealReviewCommand): Promise<void> {
    if (command.authorId !== command.user.id)
      throw new ForbiddenException(
        DealReviewErrorMessage.CREATE_DEAL_REVIEW_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const lastReview = await this.loadPort.findLastDealReview(command.refId, command.authorId);
    if (lastReview) throw new ForbiddenException(DealReviewErrorMessage.DEAL_REVIEW_ALREADY_EXIST);

    const review = this.publisher.mergeObjectContext(
      new DealReviewEntity({
        ...pick(command, [
          'id',
          'type',
          'refId',
          'refVersionId',
          'authorId',
          'revieweeId',
          'groupId',
          'title',
          'content',
        ]),
      }),
    );

    review.create();
    await this.savePort.create(review);
    await this.savePort.connectMannerTags(review.id, command.mannerTagIds);
    review.commit();
  }
}
