import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandErrorMessage } from '@lib/domains/brand/domain/brand.error.message';
import { FollowBrandCommand } from './follow-brand.command';
import { BrandResponse } from '../../dtos/brand.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(FollowBrandCommand)
export class FollowBrandHandler extends PrismaCommandHandler<FollowBrandCommand, BrandResponse> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandResponse);
  }

  async execute(command: FollowBrandCommand): Promise<BrandResponse> {
    const existingFollow = await this.prismaService.followBrand.findFirst({
      where: {
        userId: command.user.id,
        brandId: command.brandId,
      },
    });

    if (existingFollow)
      throw new InternalServerErrorException(BrandErrorMessage.BRAND_ALREADY_EXISTS);

    const followBrand = await this.prismaService.followBrand.create({
      data: {
        userId: command.user.id,
        brandId: command.brandId,
      },
      include: {
        brand: true,
      },
    });

    return this.parseResponse(followBrand.brand);
  }
}
