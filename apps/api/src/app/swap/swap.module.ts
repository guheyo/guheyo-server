import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SWAP_PROVIDERS } from '@lib/domains/swap/swap.providers';
import { SwapResolver } from './swap.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [SwapResolver, ...SWAP_PROVIDERS],
})
export class SwapModule {}
