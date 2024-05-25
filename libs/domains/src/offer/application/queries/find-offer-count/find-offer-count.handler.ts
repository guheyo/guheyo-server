import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindOfferCountQuery } from './find-offer-count.query';

@QueryHandler(FindOfferCountQuery)
export class FindOfferCountHandler extends PrismaQueryHandler {
  async execute(query: FindOfferCountQuery): Promise<Number> {
    const count = await this.prismaService.offer.countOffer({
      ...query,
    });
    return count;
  }
}
