import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { ConnectOrCreateTagsCommand } from '@lib/domains/post/application/commands/connect-or-create-tags/connect-or-create-tags.command';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { UpdateThumbnailCommand } from '@lib/domains/post/application/commands/update-thumbnail/update-thumbnail.command';
import { ThreadCreatedEvent } from '../events/thread-created/thread-created.event';
import { THREAD } from '../../domain/thread.constants';
import { ThreadUpdatedEvent } from '../events/thread-updated/thread-updated.event';

@Injectable()
export class ThreadSagas {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ThreadCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: THREAD,
            refId: event.threadId,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: THREAD,
            refId: event.threadId,
          }),
          new ConnectOrCreateTagsCommand({
            postId: event.postId,
            type: THREAD,
            tagNames: event.tagNames,
          }),
        ),
      ),
    );

  @Saga()
  threadUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ThreadUpdatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: THREAD,
            refId: event.threadId,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: THREAD,
            refId: event.threadId,
          }),
        ),
      ),
    );
}
