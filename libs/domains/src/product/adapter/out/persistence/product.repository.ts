import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ProductEntity } from '@lib/domains/product/domain/product.entity';
import { ProductLoadPort } from '@lib/domains/product/application/ports/out/product.load.port';
import { ProductSavePort } from '@lib/domains/product/application/ports/out/product.save.port';

@Injectable()
export class ProductRepository
  extends PrismaRepository<ProductEntity>
  implements ProductLoadPort, ProductSavePort
{
  constructor() {
    super(ProductEntity);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(product);
  }

  async create(product: ProductEntity): Promise<void> {
    await this.prismaService.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        brandId: product.brandId,
      },
    });
  }

  async createMany(products: ProductEntity[]): Promise<void> {
    await Promise.all(products.map((product) => this.create(product)));
  }

  async save(product: ProductEntity): Promise<void> {
    await this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        brandId: product.brandId,
      },
    });
  }

  async delete(product: ProductEntity): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });
  }
}
