import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BUMP_PROVIDERS } from '@lib/domains/bump/bump.providers';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [...BUMP_PROVIDERS],
})
export class BumpModule {}
