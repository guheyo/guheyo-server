import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import _ from 'lodash';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UpdateOfferCommand } from './update-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferPreviewResponse } from '../../dtos/offer-preview.response';

@CommandHandler(UpdateOfferCommand)
export class UpdateOfferHandler extends PrismaCommandHandler<
  UpdateOfferCommand,
  OfferPreviewResponse
> {
  constructor(
    @Inject('OfferSavePort') private offerSavePort: OfferSavePort,
    @Inject('OfferLoadPort') private offerLoadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(OfferPreviewResponse);
  }

  async execute(command: UpdateOfferCommand): Promise<OfferPreviewResponse> {
    let offer = await this.offerLoadPort.findById(command.id);
    if (!offer) throw new NotFoundException(OfferErrorMessage.OFFER_IS_NOT_FOUND);
    if (!offer.isAuthorized(command.sellerId))
      throw new ForbiddenException(OfferErrorMessage.OFFER_CHANGES_FROM_UNAUTHORIZED_USER);
    if (offer.hasUncommentedReports())
      throw new ForbiddenException(OfferErrorMessage.UNCOMMENTED_REPORT_EXISTS);

    offer = this.publisher.mergeObjectContext(offer);
    offer.update(
      _.pick(command, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'productCategoryId',
        'status',
        'hidden',
        'brandId',
      ]),
    );
    await this.offerSavePort.save(offer);
    offer.commit();
    return this.parseResponse(offer);
  }
}
