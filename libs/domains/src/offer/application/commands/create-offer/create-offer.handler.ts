import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { DAILY_OFFER_POSTING_LIMIT, DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateOfferCommand } from './create-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferLoadPort } from '../../ports/out/offer.load.port';
import { OfferResponse } from '../../dtos/offer.response';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler extends PrismaCommandHandler<CreateOfferCommand, OfferResponse> {
  constructor(
    @Inject('OfferSavePort') private savePort: OfferSavePort,
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(OfferResponse);
  }

  async execute(command: CreateOfferCommand): Promise<void> {
    if (command.sellerId !== command.user.id)
      throw new ForbiddenException(OfferErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const countDailyOfferPostingInSameCategory = await this.prismaService.offer.countOffer({
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
