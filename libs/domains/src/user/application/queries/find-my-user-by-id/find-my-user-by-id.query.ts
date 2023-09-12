import { FindByIdQuery } from '@lib/shared/cqrs/queries/find-by-id/find-by-id.query';

export class FindMyUserByIdQuery extends FindByIdQuery {
  constructor(public readonly id: string) {
    super(id);
  }
}
