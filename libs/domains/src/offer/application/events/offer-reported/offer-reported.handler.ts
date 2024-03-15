import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { ReportCreatedEvent } from '@lib/domains/report/application/events/report-created/report-created.event';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferSavePort } from '../../ports/out/offer.save.port';

@EventsHandler(ReportCreatedEvent)
export class OfferReportedHandler implements IEventHandler<ReportCreatedEvent> {
  constructor(
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    @Inject('OfferSavePort') private savePort: OfferSavePort,
  ) {}

  async handle(event: ReportCreatedEvent) {
    if (event.type !== 'offer') return;

    const offer = await this.loadPort.findById(event.refId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_FROM_REPORTED_NOT_FOUND);

    offer.checkReports();
    this.savePort.save(offer);
  }
}
