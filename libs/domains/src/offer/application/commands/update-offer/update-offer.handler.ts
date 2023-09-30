import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
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
  ) {}

  async execute(command: UpdateOfferCommand): Promise<void> {
    const offer = await this.offerLoadPort.findById(command.id);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);

    offer.updateOffer(
      _.pick(command, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'brandId',
      ]),
    );
    await this.offerSavePort.save(offer);
  }
}
