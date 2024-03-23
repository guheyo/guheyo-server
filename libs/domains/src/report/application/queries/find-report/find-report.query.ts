import { IQuery } from '@nestjs/cqrs';
import { FindReportArgs } from './find-report.args';

export class FindReportQuery implements IQuery {
  id?: string;

  type?: string;

  refId?: string;

  authorId?: string;

  constructor(args: FindReportArgs) {
    this.id = args.id;
    this.type = args.type;
    this.refId = args.refId;
    this.authorId = args.authorId;
  }
}
