import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, filter, map, of } from 'rxjs';
import { CheckPostReportsCommand } from '@lib/domains/post/application/commands/check-post-reports/check-post-reports.command';
import { ConnectRolesCommand } from '@lib/domains/user/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/user/application/commands/disconnect-roles/disconnect-roles.command';
import { CheckReportCommentsCommand } from '../commands/check-report-comments/check-report-comments.command';
import { ReportCreatedEvent } from '../events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../events/report-status-updated/report-status-updated.event';
import { CheckedReportedUserEvent } from '../events/checked-reported-user/checked-reported-user.event';
import { CheckReportedUserCommand } from '../commands/check-reported-user/check-reported-user.command';
import { ReportCommentedEvent } from '../events/report-commented/report-commented.event';

@Injectable()
export class ReportSagas {
  @Saga()
  reportCommented = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCommentedEvent),
      map((event) => new CheckReportCommentsCommand(event)),
    );

  @Saga()
  postReportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      filter((event) => event.type === 'post'),
      concatMap((event) =>
        of(
          new CheckPostReportsCommand({
            postId: event.reportedPostId!,
            reportStatus: event.reportStatus,
          }),
          new CheckReportedUserCommand({
            reportId: event.reportId,
          }),
        ),
      ),
    );

  @Saga()
  postReportStatusUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportStatusUpdatedEvent),
      filter((event) => event.type === 'post'),
      concatMap((event) =>
        of(
          new CheckPostReportsCommand({
            postId: event.reportedPostId!,
            reportStatus: event.reportStatus,
          }),
          new CheckReportedUserCommand({
            reportId: event.reportId,
          }),
        ),
      ),
    );

  @Saga()
  reportedUserChecked = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(CheckedReportedUserEvent),
      map((event) =>
        event.hasUncommentedReceivedReports
          ? new ConnectRolesCommand({
              input: {
                roleIds: event.roleIds,
                roleNames: event.roleNames,
              },
              userId: event.userId,
            })
          : new DisconnectRolesCommand({
              input: {
                roleIds: [],
                roleNames: event.roleNames,
              },
              userId: event.userId!,
            }),
      ),
    );
}
