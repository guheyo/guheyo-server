import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { BRAND_PROVIDERS } from '@lib/domains/brand/brand.providers';
import { BrandResolver } from './brand.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [BrandResolver, ...BRAND_PROVIDERS],
})
export class BrandModule {}
