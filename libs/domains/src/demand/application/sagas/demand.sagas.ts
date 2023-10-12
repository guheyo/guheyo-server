import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { DemandCreatedEvent } from '../events/demand-created/demand-created.event';
import { DemandUpdatedEvent } from '../events/demand-updated/demand-updated.event';

@Injectable()
export class DemandSagas {
  @Saga()
  demandCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(DemandCreatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'demand',
            refId: event.id,
          }),
      ),
    );

  @Saga()
  demandUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(DemandUpdatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'demand',
            refId: event.id,
          }),
      ),
    );
}
