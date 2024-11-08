import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { FindProductsQuery } from './find-products.query';
import { PaginatedProductsResponse } from './paginated-products.response';
import { ProductPreviewResponse } from '../../dtos/product-preview.response';

@QueryHandler(FindProductsQuery)
export class FindProductsHandler extends PrismaQueryHandler {
  async execute(query: FindProductsQuery): Promise<PaginatedProductsResponse> {
    const where: Prisma.ProductWhereInput = query.where
      ? {
          name: parseContainsSearcher({
            keyword: query.keyword,
          }),
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const orderBy: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput[] = [];
    orderBy.push(
      {
        name: query.orderBy?.name || 'asc',
      },
      {
        createdAt: query.orderBy?.createdAt || 'desc',
      },
      {
        id: 'asc',
      },
    );

    const products = await this.prismaService.product.findMany({
      where,
      orderBy,
      include: {
        group: true,
        category: true,
        brand: true,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
    });

    return paginate<ProductPreviewResponse>(
      products.map((product) =>
        plainToInstance(ProductPreviewResponse, {
          ...product,
        }),
      ),
      'id',
      query.take,
    );
  }
}
