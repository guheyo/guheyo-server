import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { plainToInstance } from 'class-transformer';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindGroupPreviewsQuery } from './find-group-previews.query';
import { GroupPreviewResponse } from '../../dtos/group-preview.response';
import { PaginatedGroupPreviewsResponse } from './paginated-group-previews.response';

@QueryHandler(FindGroupPreviewsQuery)
export class FindGroupPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindGroupPreviewsQuery): Promise<PaginatedGroupPreviewsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const groups = await this.prismaService.group.findMany({
      where: {
        position: {
          gt: 0,
        },
        status: query.where?.status,
      },
      orderBy: {
        position: query.orderBy?.position,
        createdAt: query.orderBy?.createdAt,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
    });

    const groupPreviewPromises = groups.map(async (group) => {
      const sells = await this.prismaService.offer.findMany({
        where: {
          post: {
            groupId: group.id,
            archivedAt: {
              equals: null,
            },
          },
          businessFunction: 'sell',
          status: OFFER_OPEN,
        },
        include: {
          post: {
            include: {
              group: true,
              category: true,
              user: {
                select: {
                  id: true,
                  createdAt: true,
                  username: true,
                  avatarURL: true,
                  bot: true,
                },
              },
              tags: true,
              brands: true,
            },
          },
        },
        take: 2,
        orderBy: {
          bumpedAt: 'desc',
        },
      });
      const buys = await this.prismaService.offer.findMany({
        where: {
          post: {
            groupId: group.id,
            archivedAt: {
              equals: null,
            },
          },
          businessFunction: 'buy',
          status: OFFER_OPEN,
        },
        include: {
          post: {
            include: {
              group: true,
              category: true,
              user: {
                select: {
                  id: true,
                  createdAt: true,
                  username: true,
                  avatarURL: true,
                  bot: true,
                },
              },
              tags: true,
              brands: true,
            },
          },
        },
        take: 2,
        orderBy: {
          bumpedAt: 'desc',
        },
      });
      return {
        ...group,
        sells,
        buys,
      };
    });
    const groupPreviews = await Promise.all(groupPreviewPromises);

    return paginate<GroupPreviewResponse>(
      groupPreviews.map((group) => plainToInstance(GroupPreviewResponse, group)),
      'id',
      query.take,
    );
  }
}
