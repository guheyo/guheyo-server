import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindBrandsQuery } from './find-brands.query';
import { BrandResponse } from '../../dtos/brand.response';

@QueryHandler(FindBrandsQuery)
export class FindBrandssHandler extends PrismaQueryHandler {
  async execute(query: FindBrandsQuery): Promise<BrandResponse[]> {
    const brands = await this.prismaService.brand.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        links: {
          include: {
            platform: true,
          },
        },
      },
    });
    return brands.map((brand) => plainToClass(BrandResponse, brand));
  }
}
