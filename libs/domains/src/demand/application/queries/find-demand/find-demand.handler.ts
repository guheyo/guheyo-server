import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { FindDemandQuery } from './find-demand.query';
import { DemandResponse } from '../../dtos/demand.response';

@QueryHandler(FindDemandQuery)
export class FindDemandHandler extends PrismaQueryHandler<FindDemandQuery, DemandResponse> {
  constructor() {
    super(DemandResponse);
  }

  async execute(query: FindDemandQuery): Promise<DemandResponse | null> {
    if (!query.id && !query.slug) return null;

    const demand = await this.prismaService.demand.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
      include: {
        group: true,
        buyer: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            socialAccounts: true,
          },
        },
      },
    });
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);
    if (demand.isHidden && demand.buyerId !== query.userId)
      throw new ForbiddenException(DemandErrorMessage.FIND_REQUEST_FROM_UNAUTHORIZED_USER);

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'demand',
        refId: demand.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponse({
      ...demand,
      images,
    });
  }
}
