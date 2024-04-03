export class VersionReportedInput {
  id: string;

  tableName: string;

  refId: string;

  constructor({ id, tableName, refId }: { id: string; tableName: string; refId: string }) {
    this.id = id;
    this.tableName = tableName;
    this.refId = refId;
  }
}
