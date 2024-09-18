import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { FindBrandsQuery } from './find-brands.query';
import { BrandResponse } from '../../dtos/brand.response';
import { PaginatedBrandsResponse } from './paginated-brands.response';

@QueryHandler(FindBrandsQuery)
export class FindBrandsHandler extends PrismaQueryHandler {
  async execute(query: FindBrandsQuery): Promise<PaginatedBrandsResponse> {
    const where: Prisma.BrandWhereInput = query.where
      ? {
          groups: query.where.groupId
            ? {
                some: {
                  id: {
                    in: [query.where.groupId],
                  },
                },
              }
            : undefined,
          name: parseContainsSearcher({
            keyword: query.keyword,
          }),
          ...(query.where.followed && {
            followBrands: {
              some: {
                userId: query.userId,
              },
            },
          }),
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const brands = await this.prismaService.brand.findMany({
      where,
      orderBy: {
        createdAt: query.orderBy?.createdAt,
        ...(query.orderBy?.follower && {
          followBrands: {
            _count: query.orderBy?.follower,
          },
        }),
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        groups: true,
        links: {
          include: {
            platform: true,
          },
        },
        followBrands: {
          include: {
            user: true,
          },
        },
      },
    });

    return paginate<BrandResponse>(
      brands.map((brand) =>
        plainToInstance(BrandResponse, {
          ...brand,
          followed: brand.followBrands.some((followBrand) => followBrand.userId === query.userId),
        }),
      ),
      'id',
      query.take,
    );
  }
}
