import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BrandErrorMessage } from '@lib/domains/brand/domain/brand.error.message';
import { FindBrandQuery } from './find-brand.query';
import { BrandDetailResponse } from '../../dtos/brand-detail.response';

@QueryHandler(FindBrandQuery)
export class FindBrandHandler extends PrismaQueryHandler {
  async execute(query: FindBrandQuery): Promise<BrandDetailResponse | null> {
    if (!query.id && !query.slug) return null;

    const brand = await this.prismaService.brand.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
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
    if (!brand) throw new NotFoundException(BrandErrorMessage.BRAND_NOT_FOUND);

    return plainToInstance(BrandDetailResponse, {
      ...brand,
      followed: brand.followBrands.some((followBrand) => followBrand.userId === query.userId),
    });
  }
}
