import { IQuery } from '@nestjs/cqrs';

export class FindDemandQuery implements IQuery {
  constructor(public readonly slug: string) {}
}
