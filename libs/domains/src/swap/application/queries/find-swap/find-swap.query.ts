import { IQuery } from '@nestjs/cqrs';

export class FindSwapQuery implements IQuery {
  constructor(public readonly slug: string) {}
}
