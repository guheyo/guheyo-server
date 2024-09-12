import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { LinkEntity } from '@lib/domains/brand/domain/link.entity';
import { CreateBrandCommand } from './create-brand.command';
import { BrandResponse } from '../../dtos/brand.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler extends PrismaCommandHandler<CreateBrandCommand, BrandResponse> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandResponse);
  }

  async execute(command: CreateBrandCommand): Promise<BrandResponse> {
    const brand = new BrandEntity({
      id: command.id,
      name: command.name,
      slug: command.slug,
      description: command.description,
      logo: command.logo,
      groupIds: command.groupIds,
      links: command.links.map((link) => new LinkEntity(link)),
    });
    await this.savePort.create(brand);

    const newBrand = this.loadPort.findById(brand.id);
    return this.parseResponse(newBrand);
  }
}
