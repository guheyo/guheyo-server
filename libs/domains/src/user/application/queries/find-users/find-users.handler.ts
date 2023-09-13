import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindUsersQuery } from './find-users.query';
import { UserLoadPort } from '../../port/out/user.load.port';
import { PaginatedUsersResponse } from './paginated-users.response';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: FindUsersQuery): Promise<PaginatedUsersResponse> {
    return this.userLoadPort.findUsers(query);
  }
}
