import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindBrandsQuery } from './find-brands.query';
import { BrandResponse } from '../../dtos/brand.response';
import { PaginatedBrandsResponse } from './paginated-brands.response';

@QueryHandler(FindBrandsQuery)
export class FindBrandsHandler extends PrismaQueryHandler {
  async execute(query: FindBrandsQuery): Promise<PaginatedBrandsResponse> {
    const where: Prisma.BrandWhereInput = query.where
      ? {
          groups: query.where.groupIds
            ? {
                some: {
                  id: {
                    in: query.where.groupIds,
                  },
                },
              }
            : undefined,
        }
      : {};

    const brands = await this.prismaService.brand.findMany({
      where,
      orderBy: {
        createdAt: query.orderBy?.createdAt,
      },
      include: {
        links: {
          include: {
            platform: true,
          },
        },
      },
    });

    return paginate<BrandResponse>(
      brands.map((brand) => plainToInstance(BrandResponse, brand)),
      'id',
      query.take,
    );
  }
}
