import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, filter, map, of } from 'rxjs';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { pick } from 'lodash';
import { CommentCreatedEvent } from '@lib/domains/comment/application/events/comment-created/comment-created.event';
import { CheckOfferReportsCommand } from '@lib/domains/offer/application/commands/check-offer-reports/check-offer-reports.command';
import { CheckDemandReportsCommand } from '@lib/domains/demand/application/commands/check-demand-reports/check-demand-reports.command';
import { CheckSwapReportsCommand } from '@lib/domains/swap/application/commands/check-swap-reports/check-swap-reports.command';
import { CheckReceivedReportsCommand } from '@lib/domains/user/application/commands/check-received-reports/check-received-reports.command';
import { ReportCommentedEvent } from '../events/report-commented/report-commented.event';
import { CheckReportCommentsCommand } from '../commands/check-report-comments/check-report-comments.command';
import { ReportCreatedEvent } from '../events/report-created/report-created.event';
import { ReportStatusUpdatedEvent } from '../events/report-status-updated/report-status-updated.event';

@Injectable()
export class ReportSagas {
  @Saga()
  reportCommented = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCommentedEvent),
      map(
        (event) =>
          new CreateCommentCommand({
            ...pick(event, ['id', 'authorId', 'content', 'source']),
            type: 'report',
            refId: event.reportId,
          }),
      ),
    );

  @Saga()
  reportCommentCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(CommentCreatedEvent),
      filter((event) => event.type === 'report'),
      map((event) => new CheckReportCommentsCommand(event)),
    );

  @Saga()
  reportCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportCreatedEvent),
      concatMap((event) =>
        of(
          event.type === 'offer'
            ? new CheckOfferReportsCommand(event)
            : event.type === 'demand'
            ? new CheckDemandReportsCommand(event)
            : new CheckSwapReportsCommand(event),
          new CheckReceivedReportsCommand({
            userId: event.reportedUserId!,
          }),
        ),
      ),
    );

  @Saga()
  reportStatusUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ReportStatusUpdatedEvent),
      map((event) => {
        if (event.type === 'offer') return new CheckOfferReportsCommand(event);
        if (event.type === 'demand') return new CheckDemandReportsCommand(event);
        return new CheckSwapReportsCommand(event);
      }),
    );
}
