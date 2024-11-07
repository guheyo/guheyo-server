import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductErrorMessage } from '@lib/domains/product/domain/product.error.message';
import { FindProductPreviewQuery } from './find-product-preview.query';
import { ProductPreviewResponse } from '../../dtos/product-preview.response';

@QueryHandler(FindProductPreviewQuery)
export class FindProductPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindProductPreviewQuery): Promise<ProductPreviewResponse | null> {
    if (!query.id) return null;

    const product = await this.prismaService.product.findFirst({
      where: {
        id: query.id,
      },
    });
    if (!product) throw new NotFoundException(ProductErrorMessage.PRODUCT_NOT_FOUND);

    return plainToInstance(ProductPreviewResponse, {
      ...product,
    });
  }
}
