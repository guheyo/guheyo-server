import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindBidCountQuery } from './find-bid-count.query';
import { BidCountResponse } from '../../dtos/bid-count.response';

@QueryHandler(FindBidCountQuery)
export class FindBidCountHandler extends PrismaQueryHandler {
  async execute(query: FindBidCountQuery): Promise<BidCountResponse> {
    const count = await this.prismaService.bid.count({
      where: {
        auctionId: query.auctionId,
      },
    });

    return plainToInstance(BidCountResponse, {
      auctionId: query.auctionId,
      count,
    });
  }
}
