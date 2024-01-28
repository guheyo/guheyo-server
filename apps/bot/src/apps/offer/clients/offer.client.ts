import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { DealClient } from '../../deal/clients/deal.client';
import { OfferParser } from '../parsers/offer.parser';

@Injectable()
export class OfferClient extends DealClient {
  constructor(protected readonly dealParser: OfferParser) {
    super('offer', dealParser);
  }

  async createDeal(input: CreateOfferInput) {
    await this.commandBus.execute(new CreateOfferCommand(input));
  }

  async updateDeal(input: UpdateOfferInput) {
    await this.commandBus.execute(new UpdateOfferCommand(input));
  }

  async deleteDeal(id: string) {
    await this.commandBus.execute(new DeleteOfferCommand(id));
  }
}
