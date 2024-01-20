import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMyUserByUsernameQuery } from './find-my-user-by-username.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserByUsernameQuery)
export class FindMyUserByUsernameHandler extends PrismaQueryHandler<
  FindMyUserByUsernameQuery,
  MyUserResponse
> {
  constructor() {
    super(MyUserResponse);
  }

  async execute(query: FindMyUserByUsernameQuery): Promise<MyUserResponse | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: query.username,
      },
      include: {
        socialAccounts: true,
        members: {
          include: {
            roles: true,
          },
        },
      },
    });
    return this.parseResponse(user);
  }
}
