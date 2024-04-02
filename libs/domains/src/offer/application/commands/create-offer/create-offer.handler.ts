import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { DAILY_OFFER_POSTING_LIMIT, DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { CreateOfferCommand } from './create-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(
    @Inject('OfferSavePort') private savePort: OfferSavePort,
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOfferCommand): Promise<void> {
    if (command.sellerId !== command.user.id)
      throw new ForbiddenException(OfferErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const countDailyOfferPostingInSameCategory = await this.loadPort.findOfferCount({
      sellerId: command.sellerId,
      productCategoryId: command.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailyOfferPostingInSameCategory > DAILY_OFFER_POSTING_LIMIT)
      throw new ForbiddenException(OfferErrorMessage.DAILY_OFFER_POSTING_LIMIT_EXCEEDED);

    const offer = this.publisher.mergeObjectContext(new OfferEntity(command));
    offer.create();
    await this.savePort.create(offer);
    offer.commit();
  }
}
