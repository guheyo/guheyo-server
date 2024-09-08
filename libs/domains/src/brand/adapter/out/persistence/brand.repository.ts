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
    });
    return this.toEntity(brand);
  }

  async create(brand: BrandEntity): Promise<void> {
    await this.prismaService.brand.create({
      data: _.pick(brand, ['id', 'name', 'slug', 'description', 'logo']),
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
      data: _.pick(brand, 'name', 'slug', 'description', 'logo'),
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
