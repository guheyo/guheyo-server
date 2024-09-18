import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { BrandLoadPort } from '@lib/domains/brand/application/ports/out/brand.load.port';
import { BrandSavePort } from '@lib/domains/brand/application/ports/out/brand.save.port';

@Injectable()
export class BrandRepository
  extends PrismaRepository<BrandEntity>
  implements BrandLoadPort, BrandSavePort
{
  constructor() {
    super(BrandEntity);
  }

  async findById(id: string): Promise<BrandEntity | null> {
    const brand = await this.prismaService.brand.findUnique({
      where: {
        id,
      },
      include: {
        groups: true,
        links: {
          include: {
            platform: true,
          },
        },
      },
    });
    return this.toEntity(brand);
  }

  async create(brand: BrandEntity): Promise<void> {
    await this.prismaService.brand.create({
      data: {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo: brand.logo,
        groups: {
          connect: brand.groupIds.map((id) => ({
            id,
          })),
        },
        links: {
          createMany: {
            data: brand.links.map((link) => ({
              id: link.id,
              url: link.url,
              platformId: link.platformId,
              position: link.position,
            })),
          },
        },
      },
    });
  }

  async createMany(brands: BrandEntity[]): Promise<void> {
    await Promise.all(brands.map((brand) => this.create(brand)));
  }

  async save(brand: BrandEntity): Promise<void> {
    await this.prismaService.brand.update({
      where: {
        id: brand.id,
      },
      data: {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo: brand.logo,
        groups: {
          set: brand.groupIds.map((id) => ({
            id,
          })),
        },
        links: {
          updateMany: brand.links.map((link) => ({
            where: {
              id: link.id,
            },
            data: {
              url: link.url,
            },
          })),
        },
      },
    });
  }

  async delete(brand: BrandEntity): Promise<void> {
    await this.prismaService.brand.delete({
      where: {
        id: brand.id,
      },
    });
  }
}
