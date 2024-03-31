import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { omit } from 'lodash';
import { ROOT_GROUP_SLUG } from '@lib/domains/group/domain/group.constants';
import { FindAuthUserQuery } from './find-auth-user.query';
import { AuthUserResponse } from '../../dtos/auth-user.response';

@QueryHandler(FindAuthUserQuery)
export class FindAuthUserHandler extends PrismaQueryHandler<FindAuthUserQuery, AuthUserResponse> {
  constructor() {
    super(AuthUserResponse);
  }

  async execute(query: FindAuthUserQuery): Promise<AuthUserResponse | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        socialAccounts: {
          some: {
            provider: query.provider,
            socialId: query.socialId,
          },
        },
      },
      include: {
        members: {
          include: {
            group: true,
            roles: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });

    const rootRoleNames =
      user?.members
        .find((member) => member.group.slug === ROOT_GROUP_SLUG)
        ?.roles.map((role) => role.name) || [];

    return this.parseResponse({
      ...omit(user, ['members']),
      rootRoleNames,
    });
  }
}
