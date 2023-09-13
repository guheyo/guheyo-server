import { IQuery } from '@nestjs/cqrs';

export class FindByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
