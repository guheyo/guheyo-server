import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGuildPreviewsQuery } from './find-guild-previews.query';
import { GuildPreviewResponse } from '../../dtos/guild-preview.response';

@QueryHandler(FindGuildPreviewsQuery)
export class FindGuildPreviewsHandler extends PrismaQueryHandler<
  FindGuildPreviewsQuery,
  GuildPreviewResponse
> {
  constructor() {
    super(GuildPreviewResponse);
  }

  async execute(query: FindGuildPreviewsQuery): Promise<GuildPreviewResponse[]> {
    const guilds = await this.prismaService.guild.findMany({
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
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
        demands: {
          include: {
            buyer: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
      },
    });
    const guildPreviews = guilds.map(async (guild) => {
      const offerWithImagePromises = guild.offers.map(async (offer) => ({
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
        ...guild,
        offers: await Promise.all(offerWithImagePromises),
      };
    });
    return this.parseResponses(guildPreviews);
  }
}
