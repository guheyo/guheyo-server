import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { pick } from 'lodash';
import { ReportCommentedEvent } from '../events/report-commented/report-commented.event';

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
}
