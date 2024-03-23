export class ReportStatusUpdatedInput {
  type: string;

  refId: string;

  status: string;

  constructor({ type, refId, status }: { type: string; refId: string; status: string }) {
    this.type = type;
    this.refId = refId;
    this.status = status;
  }
}
