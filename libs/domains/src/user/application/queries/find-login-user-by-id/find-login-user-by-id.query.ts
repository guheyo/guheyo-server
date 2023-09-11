import { FindByIdQuery } from '@lib/shared/cqrs/queries/find-by-id/find-by-id.query';

export class FindLoginUserByIdQuery extends FindByIdQuery {
  constructor(public readonly id: string) {
    super(id);
  }
}
