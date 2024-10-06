import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandErrorMessage } from '@lib/domains/brand/domain/brand.error.message';
import { FollowBrandCommand } from './follow-brand.command';
import { BrandDetailResponse } from '../../dtos/brand-detail.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(FollowBrandCommand)
export class FollowBrandHandler extends PrismaCommandHandler<
  FollowBrandCommand,
  BrandDetailResponse
> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandDetailResponse);
  }

  async execute(command: FollowBrandCommand): Promise<BrandDetailResponse> {
    const existingFollow = await this.prismaService.followBrand.findFirst({
      where: {
        userId: command.user.id,
        brandId: command.brandId,
      },
    });

    if (existingFollow)
      throw new InternalServerErrorException(BrandErrorMessage.BRAND_ALREADY_FOLLOWED);

    await this.prismaService.followBrand.create({
      data: {
        userId: command.user.id,
        brandId: command.brandId,
      },
    });

    const brand = await this.prismaService.brand.findUnique({
      where: {
        id: command.brandId,
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

    return this.parseResponse({
      ...brand,
      followed: brand.followBrands.some((followBrand) => followBrand.userId === command.user.id),
    });
  }
}
