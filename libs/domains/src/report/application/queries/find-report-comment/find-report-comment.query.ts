import { IQuery } from '@nestjs/cqrs';
import { FindReportCommentArgs } from './find-report-comment.args';

export class FindReportCommentQuery implements IQuery {
  reportId: string;

  constructor({ args }: { args: FindReportCommentArgs }) {
    this.reportId = args.reportId;
  }
}
