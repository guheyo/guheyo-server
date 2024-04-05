import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindSwapCountQuery } from './find-swap-count.query';

@QueryHandler(FindSwapCountQuery)
export class FindSwapCountHandler extends PrismaQueryHandler<FindSwapCountQuery, Number> {
  constructor() {
    super(Number);
  }

  async execute(query: FindSwapCountQuery): Promise<Number> {
    const count = await this.prismaService.swap.countSwap({
      ...query,
    });
    return count;
  }
}
