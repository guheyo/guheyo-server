import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { DealReviewCreatedEvent } from '../events/deal-review-created/deal-review-created.event';
import { CheckOtherDealReviewCommand } from '../commands/check-other-deal-review/check-other-deal-review.command';

@Injectable()
export class DealReviewSagas {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(DealReviewCreatedEvent),
      map(
        (event) =>
          new CheckOtherDealReviewCommand({
            ...event,
            sourceDealReviewId: event.reviewId,
          }),
      ),
    );
}
