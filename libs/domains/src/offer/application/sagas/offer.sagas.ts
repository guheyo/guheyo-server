import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { OfferCreatedEvent } from '../events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../events/offer-updated/offer-updated.event';

@Injectable()
export class OfferSagas {
  @Saga()
  offerCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferCreatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: event.businessFunction,
            refId: event.id,
          }),
      ),
    );

  @Saga()
  offerUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferUpdatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: event.businessFunction,
            refId: event.id,
          }),
      ),
    );
}
