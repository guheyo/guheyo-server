import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { DeleteOfferCommand } from './delete-offer.command';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferSavePort } from '../../ports/out/offer.save.port';

@CommandHandler(DeleteOfferCommand)
export class DeleteOfferHandler implements ICommandHandler<DeleteOfferCommand> {
  constructor(
    @Inject('OfferLoadPort') private offerLoadPort: OfferLoadPort,
    @Inject('OfferSavePort') private offerSavePort: OfferSavePort,
  ) {}

  async execute(command: DeleteOfferCommand): Promise<void> {
    const offer = await this.offerLoadPort.findById(command.id);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);

    await this.offerSavePort.delete(offer);
  }
}
