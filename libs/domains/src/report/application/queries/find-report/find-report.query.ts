import { IQuery } from '@nestjs/cqrs';
import { FindReportArgs } from './find-report.args';

export class FindReportQuery implements IQuery {
  id?: string;

  type?: string;

  offerId?: string;

  demandId?: string;

  swapId?: string;

  reporterId?: string;

  constructor(args: FindReportArgs) {
    this.id = args.id;
    this.type = args.type;
    this.offerId = args.offerId;
    this.demandId = args.demandId;
    this.swapId = args.swapId;
    this.reporterId = args.reporterId;
  }
}
