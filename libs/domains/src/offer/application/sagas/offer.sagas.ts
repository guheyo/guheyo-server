import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { ConnectTagsCommand } from '@lib/domains/post/application/commands/connect-tags/connect-tags.command';
import { UpdateThumbnailCommand } from '@lib/domains/post/application/commands/update-thumbnail/update-thumbnail.command';
import { OfferCreatedEvent } from '../events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../events/offer-updated/offer-updated.event';
import { OFFER } from '../../domain/offer.constants';

@Injectable()
export class OfferSagas {
  @Saga()
  offerCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: OFFER,
            refId: event.id,
          }),
          new ConnectTagsCommand({
            postId: event.postId,
            tagIds: event.tagIds,
          }),
        ),
      ),
    );

  @Saga()
  offerUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferUpdatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: OFFER,
            refId: event.offerId,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: OFFER,
            refId: event.offerId,
          }),
        ),
      ),
    );
}
