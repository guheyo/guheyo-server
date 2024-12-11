import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { LinkEntity } from '@lib/domains/brand/domain/link.entity';
import { plainToInstance } from 'class-transformer';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { CategoryEntity } from '@lib/domains/group/domain/category.entity';
import { CreateBrandCommand } from './create-brand.command';
import { BrandDetailResponse } from '../../dtos/brand-detail.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler extends PrismaCommandHandler<
  CreateBrandCommand,
  BrandDetailResponse
> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandDetailResponse);
  }

  async execute(command: CreateBrandCommand): Promise<void> {
    const brand = new BrandEntity({
      id: command.id,
      name: command.name,
      slug: command.slug,
      description: command.description,
      logo: command.logo,
      groups: command.groupIds.map((id) => plainToInstance(GroupEntity, { id })),
      categories: command.categoryIds.map((id) => plainToInstance(CategoryEntity, { id })),
      links: command.links.map((link) => new LinkEntity(link)),
    });
    await this.savePort.create(brand);
  }
}
