import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { CreateBumpCommand } from '@lib/domains/bump/application/commands/create-bump/create-bump.command';
import { BumpedEvent } from '../events/bumped/bumped.event';

@Injectable()
export class BumpSagas {
  @Saga()
  bumped = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(BumpedEvent),
      map((event) => new CreateBumpCommand(event)),
    );
}
