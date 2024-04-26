import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { UserReviewCreatedEvent } from '../events/user-review-created/user-review-created.event';
import { CheckOtherUserReviewCommand } from '../commands/check-other-user-review/check-other-user-review.command';

@Injectable()
export class UserReviewSagas {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserReviewCreatedEvent),
      map(
        (event) =>
          new CheckOtherUserReviewCommand({
            sourceUserReviewId: event.reviewId,
            reviewStatus: event.reviewStatus,
          }),
      ),
    );
}
