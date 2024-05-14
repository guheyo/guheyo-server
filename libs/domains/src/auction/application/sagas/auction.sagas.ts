import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, map, of } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { ConnectTagsCommand } from '@lib/domains/post/application/commands/connect-tags/connect-tags.command';
import { AuctionCreatedEvent } from '../events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../events/auction-updated/auction-updated.event';

@Injectable()
export class AuctionSagas {
  @Saga()
  auctionCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: 'auction',
            refId: event.id,
          }),
          new ConnectTagsCommand({
            postId: event.id,
            tagIds: event.tagIds,
          }),
        ),
      ),
    );

  @Saga()
  auctionUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionUpdatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'auction',
            refId: event.id,
          }),
      ),
    );
}
