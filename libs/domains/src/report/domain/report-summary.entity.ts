import { REPORT_OPEN } from './report.constants';

export class ReportSummaryEntity {
  id: string;

  status: string;

  constructor(partial: Partial<ReportSummaryEntity>) {
    Object.assign(this, partial);
  }

  isOpen() {
    return this.status === REPORT_OPEN;
  }
}
