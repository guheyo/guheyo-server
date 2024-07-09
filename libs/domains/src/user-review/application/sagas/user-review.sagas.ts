import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { ConnectTagsCommand } from '@lib/domains/post/application/commands/connect-tags/connect-tags.command';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { UserReviewCreatedEvent } from '../events/user-review-created/user-review-created.event';
import { CheckOtherUserReviewCommand } from '../commands/check-other-user-review/check-other-user-review.command';
import { USER_REVIEW } from '../../domain/user-review.constants';

@Injectable()
export class UserReviewSagas {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserReviewCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: USER_REVIEW,
            refId: event.reviewId,
          }),
          new CheckOtherUserReviewCommand({
            sourceUserReviewId: event.reviewId,
            reviewStatus: event.reviewStatus,
          }),
          new ConnectTagsCommand({
            postId: event.postId,
            tagIds: event.tagIds,
          }),
        ),
      ),
    );
}
