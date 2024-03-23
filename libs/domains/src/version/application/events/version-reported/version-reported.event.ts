import { IEvent } from '@nestjs/cqrs';
import { VersionReportedInput } from './version-reported.input';

export class VersionReportedEvent implements IEvent {
  id: string;

  tableName: string;

  refId: string;

  constructor(input: VersionReportedInput) {
    this.id = input.id;
    this.tableName = input.tableName;
    this.refId = input.refId;
  }
}
