import { IQuery } from '@nestjs/cqrs';

export class ByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
