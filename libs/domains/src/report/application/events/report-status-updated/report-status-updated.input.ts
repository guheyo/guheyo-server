export class ReportStatusUpdatedInput {
  type: string;

  refId: string;

  reportStatus: string;

  reportedUserId?: string;

  constructor({
    type,
    refId,
    reportStatus,
    reportedUserId,
  }: {
    type: string;
    refId: string;
    reportStatus: string;
    reportedUserId?: string;
  }) {
    this.type = type;
    this.refId = refId;
    this.reportStatus = reportStatus;
    this.reportedUserId = reportedUserId;
  }
}
