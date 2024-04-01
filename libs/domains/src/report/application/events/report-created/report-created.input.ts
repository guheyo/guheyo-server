export class ReportCreatedInput {
  reportId: string;

  type: string;

  refId: string;

  reportStatus: string;

  constructor({
    reportId,
    type,
    refId,
    reportStatus,
  }: {
    reportId: string;
    type: string;
    refId: string;
    reportStatus: string;
  }) {
    this.reportId = reportId;
    this.type = type;
    this.refId = refId;
    this.reportStatus = reportStatus;
  }
}
