import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { FindMyUserQuery } from './find-my-user.query';
import { MyUserResponse } from '../../dtos/my-user.response';

@QueryHandler(FindMyUserQuery)
export class FindMyUserHandler extends PrismaQueryHandler {
  async execute(query: FindMyUserQuery): Promise<MyUserResponse | null> {
    let where: Prisma.UserWhereInput;
    if (query.userId) {
      where = {
        id: query.userId,
      };
    } else if (query.provider && query.socialId) {
      where = {
        socialAccounts: {
          some: {
            provider: query.provider,
            socialId: query.socialId,
          },
        },
      };
    } else {
      return null;
    }

    const user = await this.prismaService.user.findFirst({
      where,
      include: {
        socialAccounts: true,
        roles: {
          include: {
            group: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return plainToClass(MyUserResponse, user);
  }
}
