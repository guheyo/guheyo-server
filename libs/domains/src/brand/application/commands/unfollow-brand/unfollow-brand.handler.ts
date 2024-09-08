import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandErrorMessage } from '@lib/domains/brand/domain/brand.error.message';
import { UnfollowBrandCommand } from './unfollow-brand.command';
import { BrandResponse } from '../../dtos/brand.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(UnfollowBrandCommand)
export class UnfollowBrandHandler extends PrismaCommandHandler<
  UnfollowBrandCommand,
  BrandResponse
> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandResponse);
  }

  async execute(command: UnfollowBrandCommand): Promise<BrandResponse> {
    const existingFollow = await this.prismaService.followBrand.findFirst({
      where: {
        userId: command.user.id,
        brandId: command.brandId,
      },
      include: {
        brand: true,
      },
    });

    if (!existingFollow)
      throw new InternalServerErrorException(BrandErrorMessage.BRAND_NOT_FOLLOWED);

    await this.prismaService.followBrand.hardDelete({
      where: {
        id: existingFollow.id,
      },
    });

    return this.parseResponse(existingFollow.brand);
  }
}
