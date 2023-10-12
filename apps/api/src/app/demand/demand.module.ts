import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DEMAND_PROVIDERS } from '@lib/domains/demand/demand.providers';
import { DemandResolver } from './demand.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [DemandResolver, ...DEMAND_PROVIDERS],
})
export class DemandModule {}
