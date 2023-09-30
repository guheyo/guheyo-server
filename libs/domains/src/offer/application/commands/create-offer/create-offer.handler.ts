import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { CreateOfferCommand } from './create-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler implements ICommandHandler<CreateOfferCommand> {
  constructor(@Inject('OfferSavePort') private savePort: OfferSavePort) {}

  async execute(command: CreateOfferCommand): Promise<void> {
    const offer = new OfferEntity(command);
    await this.savePort.create(offer);
  }
}
