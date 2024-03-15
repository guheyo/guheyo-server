import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ReportStatusUpdatedEvent } from '@lib/domains/report/application/events/report-status-updated/report-status-updated.event';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferSavePort } from '../../ports/out/offer.save.port';

@EventsHandler(ReportStatusUpdatedEvent)
export class OfferReportStatusUpdatedHandler implements IEventHandler<ReportStatusUpdatedEvent> {
  constructor(
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    @Inject('OfferSavePort') private savePort: OfferSavePort,
  ) {}

  async handle(event: ReportStatusUpdatedEvent) {
    if (event.type !== 'offer') return;

    const offer = await this.loadPort.findById(event.refId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);

    offer.checkReports();
    this.savePort.save(offer);
  }
}
