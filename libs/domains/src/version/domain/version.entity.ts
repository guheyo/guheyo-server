import { AggregateRoot } from '@nestjs/cqrs';

export class VersionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  schemaName: string;

  tableName: string;

  op: string;

  refId: string;

  values: any;

  constructor(partial: Partial<VersionEntity>) {
    super();
    Object.assign(this, partial);
  }
}
