import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { UserImageClient } from '../user-image/user-image.client';

@Injectable()
export class OfferClient extends UserImageClient {
  async createOffer(input: CreateOfferInput) {
    await this.commandBus.execute(new CreateOfferCommand(input));
  }
}
