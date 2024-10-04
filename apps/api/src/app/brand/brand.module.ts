import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { BRAND_PROVIDERS } from '@lib/domains/brand/brand.providers';
import { ImageModule } from '@lib/shared/image/image.module';
import { PlatformService } from '@lib/domains/platform/application/services/platform.service';
import { BrandResolver } from './brand.resolver';

@Module({
  imports: [CqrsModule, PrismaModule, ImageModule],
  providers: [BrandResolver, ...BRAND_PROVIDERS, PlatformService],
})
export class BrandModule {}
