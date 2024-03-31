export class ReportCreatedInput {
  type: string;

  refId: string;

  reportedUserId?: string;

  reportStatus: string;

  constructor({
    type,
    refId,
    reportedUserId,
    reportStatus,
  }: {
    type: string;
    refId: string;
    reportedUserId?: string;
    reportStatus: string;
  }) {
    this.type = type;
    this.refId = refId;
    this.reportedUserId = reportedUserId;
    this.reportStatus = reportStatus;
  }
}
