import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { CommentCreatedEvent } from '../events/comment-created/comment-created.event';
import { COMMENT } from '../../domain/comment.constants';

@Injectable()
export class CommentSagas {
  @Saga()
  commentCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(CommentCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: COMMENT,
            refId: event.id,
          }),
        ),
      ),
    );
}
