import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindUsersQuery } from './find-users.query';
import { PaginatedUsersResponse } from './paginated-users.response';
import { UserResponse } from '../../dtos/user.response';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler extends PrismaQueryHandler<FindUsersQuery, UserResponse> {
  constructor() {
    super(UserResponse);
  }

  async execute(query: FindUsersQuery): Promise<PaginatedUsersResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const users = await this.prismaService.user.findMany({
      cursor,
      take: query.take,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return paginate<UserResponse>(this.parseResponses(users), 'id', query.take);
  }
}
