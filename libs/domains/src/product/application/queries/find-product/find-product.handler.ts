import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductErrorMessage } from '@lib/domains/product/domain/product.error.message';
import { FindProductQuery } from './find-product.query';
import { ProductDetailResponse } from '../../dtos/product-detail.response';

@QueryHandler(FindProductQuery)
export class FindProductHandler extends PrismaQueryHandler {
  async execute(query: FindProductQuery): Promise<ProductDetailResponse | null> {
    if (!query.id) return null;

    const product = await this.prismaService.product.findFirst({
      where: {
        id: query.id,
      },
    });
    if (!product) throw new NotFoundException(ProductErrorMessage.PRODUCT_NOT_FOUND);

    return plainToInstance(ProductDetailResponse, {
      ...product,
    });
  }
}
