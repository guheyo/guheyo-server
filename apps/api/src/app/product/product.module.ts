import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { PRODUCT_PROVIDERS } from '@lib/domains/product/product.providers';
import { ImageModule } from '@lib/shared/image/image.module';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [CqrsModule, PrismaModule, ImageModule],
  providers: [ProductResolver, ...PRODUCT_PROVIDERS],
})
export class ProductModule {}
