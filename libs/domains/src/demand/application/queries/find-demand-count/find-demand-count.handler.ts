import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindDemandCountQuery } from './find-demand-count.query';

@QueryHandler(FindDemandCountQuery)
export class FindDemandCountHandler extends PrismaQueryHandler<FindDemandCountQuery, Number> {
  constructor() {
    super(Number);
  }

  async execute(query: FindDemandCountQuery): Promise<Number> {
    const count = await this.prismaService.demand.countDemand({
      ...query,
    });
    return count;
  }
}
