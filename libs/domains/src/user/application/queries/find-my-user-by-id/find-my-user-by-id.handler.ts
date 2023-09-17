import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { FindMyUserByIdQuery } from './find-my-user-by-id.query';
import { UserResponse } from '../../dtos/user.response';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserByIdQuery)
export class FindMyUserByIdHandler implements IQueryHandler<FindMyUserByIdQuery> {
  constructor(private prismaService: PrismaService) {}

  async execute(query: FindMyUserByIdQuery): Promise<UserResponse | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: query.id },
      include: {
        members: {
          include: {
            roles: true,
          },
        },
        socialAccounts: true,
      },
    });
    return user ? new MyUserResponse(user) : null;
  }
}
