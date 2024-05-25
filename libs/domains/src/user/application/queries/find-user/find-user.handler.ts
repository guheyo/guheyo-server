import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindUserQuery } from './find-user.query';
import { UserResponse } from '../../dtos/user.response';

@QueryHandler(FindUserQuery)
export class FindUserHandler extends PrismaQueryHandler {
  async execute(query: FindUserQuery): Promise<UserResponse | null> {
    if (query.provider && query.socialId) {
      const user = await this.prismaService.user.findFirst({
        where: {
          socialAccounts: {
            some: {
              provider: query.provider,
              socialId: query.socialId,
            },
          },
        },
      });
      return plainToClass(UserResponse, user);
    }
    if (query.username) {
      const user = await this.prismaService.user.findUnique({
        where: {
          username: query.username,
        },
      });
      return plainToClass(UserResponse, user);
    }
    return null;
  }
}
