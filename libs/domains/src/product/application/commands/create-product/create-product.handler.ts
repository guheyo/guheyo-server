import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ProductEntity } from '@lib/domains/product/domain/product.entity';
import { CreateProductCommand } from './create-product.command';
import { ProductDetailResponse } from '../../dtos/product-detail.response';
import { ProductSavePort } from '../../ports/out/product.save.port';
import { ProductLoadPort } from '../../ports/out/product.load.port';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler extends PrismaCommandHandler<
  CreateProductCommand,
  ProductDetailResponse
> {
  constructor(
    @Inject('ProductSavePort') private savePort: ProductSavePort,
    @Inject('ProductLoadPort') private loadPort: ProductLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(ProductDetailResponse);
  }

  async execute(command: CreateProductCommand): Promise<void> {
    const product = new ProductEntity({
      id: command.id,
      name: command.name,
      description: command.description,
      groupId: command.groupId,
      categoryId: command.categoryId,
      brandId: command.brandId,
    });
    await this.savePort.create(product);
  }
}
