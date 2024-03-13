import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import _ from 'lodash';
import { UpdateOfferCommand } from './update-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';

@CommandHandler(UpdateOfferCommand)
export class UpdateOfferHandler implements ICommandHandler<UpdateOfferCommand> {
  constructor(
    @Inject('OfferSavePort') private offerSavePort: OfferSavePort,
    @Inject('OfferLoadPort') private offerLoadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateOfferCommand): Promise<void> {
    let offer = await this.offerLoadPort.findById(command.id);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);
    if (!offer.isAuthorized(command.sellerId))
      throw new ForbiddenException(OfferErrorMessage.OFFER_CHANGES_FROM_UNAUTHORIZED_USER);

    offer = this.publisher.mergeObjectContext(offer);
    offer.update(
      _.pick(command, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'productCategoryId',
        'status',
        'brandId',
      ]),
    );
    await this.offerSavePort.save(offer);
    offer.commit();
  }
}
