import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMyUserByIdQuery } from './find-my-user-by-id.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserByIdQuery)
export class FindMyUserByIdHandler extends PrismaQueryHandler<FindMyUserByIdQuery, MyUserResponse> {
  constructor() {
    super(MyUserResponse);
  }

  async execute(query: FindMyUserByIdQuery): Promise<MyUserResponse | null> {
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
    return this.parseResponse(user);
  }
}
