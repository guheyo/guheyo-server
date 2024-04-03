import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DAILY_OFFER_POSTING_LIMIT, DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { BumpOfferCommand } from './bump-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferPreviewResponse } from '../../dtos/offer-preview.response';

@CommandHandler(BumpOfferCommand)
export class BumpOfferHandler extends PrismaCommandHandler<BumpOfferCommand, OfferPreviewResponse> {
  constructor(
    @Inject('OfferSavePort') private offerSavePort: OfferSavePort,
    @Inject('OfferLoadPort') private offerLoadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(OfferPreviewResponse);
  }

  async execute(command: BumpOfferCommand): Promise<OfferPreviewResponse> {
    let offer = await this.offerLoadPort.findById(command.input.offerId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);
    if (!offer.isAuthorized(command.user.id))
      throw new ForbiddenException(OfferErrorMessage.OFFER_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!offer.canBump())
      throw new ForbiddenException(OfferErrorMessage.OFFER_BUMP_STUCK_ON_COOLDOWN);

    const countDailyOfferPostingInSameCategory = await this.prismaService.offer.countOffer({
      sellerId: offer.sellerId,
      productCategoryId: offer.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailyOfferPostingInSameCategory > DAILY_OFFER_POSTING_LIMIT)
      throw new ForbiddenException(OfferErrorMessage.DAILY_OFFER_POSTING_LIMIT_EXCEEDED);

    offer = this.publisher.mergeObjectContext(offer);
    offer.bump(command.input);
    await this.offerSavePort.save(offer);
    offer.commit();
    return this.parseResponse(offer);
  }
}
