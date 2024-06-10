import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { ConnectTagsCommand } from '@lib/domains/post/application/commands/connect-tags/connect-tags.command';
import { UpdateThumbnailCommand } from '@lib/domains/post/application/commands/update-thumbnail/update-thumbnail.command';
import { AuctionCreatedEvent } from '../events/auction-created/auction-created.event';
import { AuctionUpdatedEvent } from '../events/auction-updated/auction-updated.event';
import { AUCTION } from '../../domain/auction.constants';
import { InitialScheduleAuctionEndCommand } from '../commands/initial-schedule-auction-end/initial-schedule-auction-end.command';
import { ReScheduleAuctionEndCommand } from '../commands/re-schedule-auction-end/re-schedule-auction-end.command';
import { AuctionExtendedEvent } from '../events/auction-extended/auction-extended.event';

@Injectable()
export class AuctionSagas {
  @Saga()
  auctionCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: AUCTION,
            refId: event.id,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: AUCTION,
            refId: event.id,
          }),
          new ConnectTagsCommand({
            postId: event.postId,
            tagIds: event.tagIds,
          }),
          new InitialScheduleAuctionEndCommand({
            input: {
              id: event.id,
              extendedEndDate: event.extendedEndDate,
            },
          }),
        ),
      ),
    );

  @Saga()
  auctionUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionUpdatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: AUCTION,
            refId: event.auctionId,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: AUCTION,
            refId: event.auctionId,
          }),
        ),
      ),
    );

  @Saga()
  auctionExtended = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AuctionExtendedEvent),
      concatMap((event) =>
        of(
          new ReScheduleAuctionEndCommand({
            input: {
              id: event.auctionId,
            },
          }),
        ),
      ),
    );
}
