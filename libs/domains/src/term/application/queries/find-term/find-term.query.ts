import { IQuery } from '@nestjs/cqrs';

export class FindTermQuery implements IQuery {
  constructor(public readonly name: string) {}
}
