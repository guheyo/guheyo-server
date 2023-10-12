import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { FindDemandByIdQuery } from './find-demand-by-id.query';
import { DemandResponse } from '../../dtos/demand.response';

@QueryHandler(FindDemandByIdQuery)
export class FindDemandByIdHandler extends PrismaQueryHandler<FindDemandByIdQuery, DemandResponse> {
  constructor() {
    super(DemandResponse);
  }

  async execute(query: FindDemandByIdQuery): Promise<any> {
    const demand = await this.prismaService.demand.findUnique({
      where: {
        id: query.id,
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
