import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { FindDemandQuery } from './find-demand.query';
import { DemandResponse } from '../../dtos/demand.response';

@QueryHandler(FindDemandQuery)
export class FindDemandHandler extends PrismaQueryHandler<FindDemandQuery, DemandResponse> {
  constructor() {
    super(DemandResponse);
  }

  async execute(query: FindDemandQuery): Promise<any> {
    const demand = await this.prismaService.demand.findFirst({
      where: {
        slug: query.slug,
      },
      include: {
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
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_IS_NOT_FOUND);

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