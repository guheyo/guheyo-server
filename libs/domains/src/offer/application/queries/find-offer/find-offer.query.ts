import { IQuery } from '@nestjs/cqrs';

export class FindOfferQuery implements IQuery {
  constructor(public readonly slug: string) {}
}
