import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BrandErrorMessage } from '@lib/domains/brand/domain/brand.error.message';
import { FindBrandPreviewQuery } from './find-brand-preview.query';
import { BrandPreviewResponse } from '../../dtos/brand-preview.response';

@QueryHandler(FindBrandPreviewQuery)
export class FindBrandPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindBrandPreviewQuery): Promise<BrandPreviewResponse | null> {
    if (!query.id && !query.slug) return null;

    const brand = await this.prismaService.brand.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
      include: {
        groups: true,
        followBrands: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!brand) throw new NotFoundException(BrandErrorMessage.BRAND_NOT_FOUND);

    return plainToInstance(BrandPreviewResponse, {
      ...brand,
      followed: brand.followBrands.some((followBrand) => followBrand.userId === query.userId),
    });
  }
}
