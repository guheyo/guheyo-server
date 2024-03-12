import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGroupPreviewsQuery } from './find-group-previews.query';
import { GroupPreviewResponse } from '../../dtos/group-preview.response';

@QueryHandler(FindGroupPreviewsQuery)
export class FindGroupPreviewsHandler extends PrismaQueryHandler<
  FindGroupPreviewsQuery,
  GroupPreviewResponse
> {
  constructor() {
    super(GroupPreviewResponse);
  }

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
      include: {
        offers: {
          include: {
            seller: {
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
          },
          orderBy: {
            bumpedAt: 'desc',
          },
          take: 3,
        },
        demands: {
          include: {
            buyer: {
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
          },
          orderBy: {
            bumpedAt: 'desc',
          },
          take: 3,
        },
      },
    });
    const groupPreviews = groups.map(async (group) => {
      const offerWithImagePromises = group.offers.map(async (offer) => ({
        ...offer,
        thumbnail: await this.prismaService.userImage.findFirst({
          where: {
            type: 'offer',
            refId: offer.id,
            tracked: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
      }));
      return {
        ...group,
        offers: await Promise.all(offerWithImagePromises),
      };
    });
    return this.parseResponses(groupPreviews);
  }
}
