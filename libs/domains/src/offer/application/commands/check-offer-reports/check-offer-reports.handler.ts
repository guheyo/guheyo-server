import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { CheckOfferReportsCommand } from './check-offer-reports.command';

@CommandHandler(CheckOfferReportsCommand)
export class CheckOfferReportsHandler implements ICommandHandler<CheckOfferReportsCommand> {
  constructor(
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    @Inject('OfferSavePort') private savePort: OfferSavePort,
  ) {}

  async execute(event: CheckOfferReportsCommand) {
    if (event.type !== 'offer') return;

    const offer = await this.loadPort.findById(event.refId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_FROM_REPORTED_NOT_FOUND);

    offer.checkReports();
    this.savePort.save(offer);
  }
}
