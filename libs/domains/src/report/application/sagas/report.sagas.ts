import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, filter, map, of } from 'rxjs';
import { includes, pick } from 'lodash';
import { CheckOfferReportsCommand } from '@lib/domains/offer/application/commands/check-offer-reports/check-offer-reports.command';
import { CheckDemandReportsCommand } from '@lib/domains/demand/application/commands/check-demand-reports/check-demand-reports.command';
import { CheckSwapReportsCommand } from '@lib/domains/swap/application/commands/check-swap-reports/check-swap-reports.command';
import { DEAL_TYPES } from '@lib/domains/deal/domain/deal.types';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';
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
  reportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      filter((event) => includes(DEAL_TYPES, event.type)),
      concatMap((event) =>
        of(
          event.type === 'offer'
            ? new CheckOfferReportsCommand(event)
            : event.type === 'demand'
            ? new CheckDemandReportsCommand(event)
            : new CheckSwapReportsCommand(event),
          new CheckReportedUserCommand({
            reportId: event.reportId,
          }),
        ),
      ),
    );

  @Saga()
  reportStatusUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportStatusUpdatedEvent),
      filter((event) => includes(DEAL_TYPES, event.type)),
      concatMap((event) =>
        of(
          event.type === 'offer'
            ? new CheckOfferReportsCommand(event)
            : event.type === 'demand'
            ? new CheckDemandReportsCommand(event)
            : new CheckSwapReportsCommand(event),
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
          ? new ConnectRolesCommand(
              pick(event, ['groupId', 'groupSlug', 'userId', 'roleIds', 'roleNames']),
            )
          : new DisconnectRolesCommand({
              id: event.memberId!,
              roleIds: [],
              roleNames: event.roleNames,
            }),
      ),
    );
}
