import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { CommentOfferReportCommand } from './comment-offer-report.command';

@CommandHandler(CommentOfferReportCommand)
export class CommentOfferReportHandler implements ICommandHandler<CommentOfferReportCommand> {
  constructor(
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    @Inject('OfferSavePort') private savePort: OfferSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CommentOfferReportCommand): Promise<void> {
    let offer = await this.loadPort.findById(command.input.offerId);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);

    offer = this.publisher.mergeObjectContext(offer);
    if (!offer.isSeller({ authorId: command.input.authorId }))
      throw new ForbiddenException(OfferErrorMessage.COMMENT_OFFER_REPORT_REQUEST_FROM_NON_SELLER);

    const report = offer.findReport({ reportId: command.input.reportId });
    if (!report) throw new NotFoundException(OfferErrorMessage.OFFER_REPORT_NOT_FOUND);

    offer.commentReport(command.input);
    await this.savePort.save(offer);
    offer.commit();
  }
}
