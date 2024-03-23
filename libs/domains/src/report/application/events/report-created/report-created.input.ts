export class ReportCreatedInput {
  type: string;

  refId: string;

  reportStatus: string;

  constructor({
    type,
    refId,
    reportStatus,
  }: {
    type: string;
    refId: string;
    reportStatus: string;
  }) {
    this.type = type;
    this.refId = refId;
    this.reportStatus = reportStatus;
  }
}
