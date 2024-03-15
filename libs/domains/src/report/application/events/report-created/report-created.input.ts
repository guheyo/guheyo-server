export class ReportCreatedInput {
  id: string;

  type: string;

  refId: string;

  constructor({ id, type, refId }: { id: string; type: string; refId: string }) {
    this.id = id;
    this.type = type;
    this.refId = refId;
  }
}
