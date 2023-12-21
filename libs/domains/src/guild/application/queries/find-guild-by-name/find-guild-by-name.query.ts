import { IQuery } from '@nestjs/cqrs';

export class FindGuildByNameQuery implements IQuery {
  constructor(public readonly name: string) {}
}
