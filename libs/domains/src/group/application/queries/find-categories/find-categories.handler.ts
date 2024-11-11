import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToInstance } from 'class-transformer';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { FindCategoriesQuery } from './find-categories.query';
import { PaginatedCategoriesResponse } from './paginated-categories.response';
import { CategoryResponse } from '../../dtos/category.response';

@QueryHandler(FindCategoriesQuery)
export class FindCategoriesHandler extends PrismaQueryHandler {
  async execute(query: FindCategoriesQuery): Promise<PaginatedCategoriesResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const categories = await this.prismaService.category.findMany({
      where: {
        name: parseContainsSearcher({ keyword: query.keyword }),
        createdAt: query.where?.createdAt,
        ...(query.where?.groupIds
          ? {
              groups: {
                some: {
                  id: {
                    in: query.where.groupIds,
                  },
                },
              },
            }
          : {}),
        ...(query.where?.categoryTypes
          ? {
              type: {
                in: query.where.categoryTypes,
              },
            }
          : {}),
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: {
        position: query.orderBy?.position,
        createdAt: query.orderBy?.createdAt,
      },
    });

    return paginate<CategoryResponse>(
      categories.map((group) => plainToInstance(CategoryResponse, group)),
      'id',
      query.take,
    );
  }
}
