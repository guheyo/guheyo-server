import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { BumpOfferCommand } from './bump-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';

@CommandHandler(BumpOfferCommand)
export class BumpOfferHandler implements ICommandHandler<BumpOfferCommand> {
  constructor(
    @Inject('OfferSavePort') private offerSavePort: OfferSavePort,
    @Inject('OfferLoadPort') private offerLoadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BumpOfferCommand): Promise<void> {
    let offer = await this.offerLoadPort.findById(command.input.offerId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);
    if (!offer.isAuthorized(command.input.sellerId))
      throw new ForbiddenException(OfferErrorMessage.OFFER_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!offer.canBump())
      throw new ForbiddenException(OfferErrorMessage.OFFER_BUMP_STUCK_ON_COOLDOWN);

    offer = this.publisher.mergeObjectContext(offer);
    offer.bump(command.input);
    await this.offerSavePort.save(offer);
    offer.commit();
  }
}
