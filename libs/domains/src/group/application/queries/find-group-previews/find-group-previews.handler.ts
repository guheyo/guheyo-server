import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { plainToClass } from 'class-transformer';
import { FindGroupPreviewsQuery } from './find-group-previews.query';
import { GroupPreviewResponse } from '../../dtos/group-preview.response';

@QueryHandler(FindGroupPreviewsQuery)
export class FindGroupPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindGroupPreviewsQuery): Promise<GroupPreviewResponse[]> {
    const groups = await this.prismaService.group.findMany({
      where: {
        position: {
          gt: 0,
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    const groupPreviews = groups.map(async (group) => {
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
    return groupPreviews.map((groupPreview) => plainToClass(GroupPreviewResponse, groupPreview));
  }
}
