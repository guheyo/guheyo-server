import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { pick } from 'lodash';
import { OfferCreatedEvent } from '../events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../events/offer-updated/offer-updated.event';
import { OfferBumpedEvent } from '../events/offer-bumped/offer-bumped.event';
import { CreateOfferBumpCommand } from '../commands/create-offer-bump/create-offer-bump.command';

@Injectable()
export class OfferSagas {
  @Saga()
  offerCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferCreatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'offer',
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
            type: 'offer',
            refId: event.id,
          }),
      ),
    );

  @Saga()
  offerBumped = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(OfferBumpedEvent),
      map(
        (event) => new CreateOfferBumpCommand(pick(event, ['id', 'offerId', 'oldData', 'newData'])),
      ),
    );
}
