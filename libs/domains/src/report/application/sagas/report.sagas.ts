import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { ConnectRolesCommand } from '@lib/domains/user/application/commands/connect-roles/connect-roles.command';
import { REPORTED_USER_ROLE_NAME } from '@lib/domains/role/domain/role.constants';
import { ReportCreatedEvent } from '../events/report-created/report-created.event';
import { ReportCommentCreatedEvent } from '../events/report-comment-created/report-comment-created.event';
import { ReportCommentUpdatedEvent } from '../events/report-comment-updated/report-comment-updated.event';

@Injectable()
export class ReportSagas {
  @Saga()
  reportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      concatMap((event) =>
        of(
          new ConnectRolesCommand({
            input: {
              roleIds: [],
              roleNames: [REPORTED_USER_ROLE_NAME],
            },
            userId: event.reportedUserId,
          }),
        ),
      ),
    );

  @Saga()
  reportCommentCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCommentCreatedEvent),
      // TODO
    );

  @Saga()
  reportCommentUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCommentUpdatedEvent),
      concatMap((event) =>
        of(
          new ConnectRolesCommand({
            input: {
              roleIds: [],
              roleNames: [REPORTED_USER_ROLE_NAME],
            },
            userId: event.reportedUserId,
          }),
        ),
      ),
    );
}
