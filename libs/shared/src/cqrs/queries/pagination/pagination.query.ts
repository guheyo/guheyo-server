import { IQuery } from '@nestjs/cqrs';
import { PaginationArgs } from './pagination.args';

export class PaginationQuery implements IQuery {
  skip: number;

  take: number;

  cursor?: string;

  constructor(paginationArgs: PaginationArgs) {
    Object.assign(this, paginationArgs);
  }
}
