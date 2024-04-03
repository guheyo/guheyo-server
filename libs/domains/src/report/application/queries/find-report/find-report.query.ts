import { IQuery } from '@nestjs/cqrs';
import { FindReportArgs } from './find-report.args';

export class FindReportQuery implements IQuery {
  id: string;

  constructor(args: FindReportArgs) {
    this.id = args.id;
  }
}
