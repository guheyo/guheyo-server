export class ReportCreatedInput {
  type: string;

  refId: string;

  constructor({ type, refId }: { type: string; refId: string }) {
    this.type = type;
    this.refId = refId;
  }
}
