import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AUCTION_PROVIDERS } from '@lib/domains/auction/auction.providers';
import { AuctionResolver } from './auction.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [AuctionResolver, ...AUCTION_PROVIDERS],
})
export class AuctionModule {}
