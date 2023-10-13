import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { SwapCreatedEvent } from '../events/swap-created/swap-created.event';
import { SwapUpdatedEvent } from '../events/swap-updated/swap-updated.event';

@Injectable()
export class SwapSagas {
  @Saga()
  swapCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(SwapCreatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'swap',
            refId: event.id,
          }),
      ),
    );

  @Saga()
  swapUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(SwapUpdatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'swap',
            refId: event.id,
          }),
      ),
    );
}
