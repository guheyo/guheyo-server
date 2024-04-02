import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import { CreateOfferCommand } from './create-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(
    @Inject('OfferSavePort') private savePort: OfferSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOfferCommand): Promise<void> {
    if (command.sellerId !== command.user.id)
      throw new ForbiddenException(OfferErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const offer = this.publisher.mergeObjectContext(new OfferEntity(command));
    offer.create();
    await this.savePort.create(offer);
    offer.commit();
  }
}
