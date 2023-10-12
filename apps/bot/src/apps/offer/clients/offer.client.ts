import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';

@Injectable()
export class OfferClient extends UserImageClient {
  async createOffer(input: CreateOfferInput) {
    await this.commandBus.execute(new CreateOfferCommand(input));
  }

  async updateOffer(input: UpdateOfferInput) {
    await this.commandBus.execute(new UpdateOfferCommand(input));
  }

  async deleteOffer(id: string) {
    await this.commandBus.execute(new DeleteOfferCommand(id));
  }
}
