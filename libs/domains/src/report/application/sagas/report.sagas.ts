import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { pick } from 'lodash';
import { CommentCreatedEvent } from '@lib/domains/comment/application/events/comment-created/comment-created.event';
import { ReportCommentedEvent } from '../events/report-commented/report-commented.event';
import { CheckReportCommentsCommand } from '../commands/check-report-comments/check-report-comments.command';

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
}
