import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';

@Injectable()
export class OfferClient {
  constructor(private readonly commandBus: CommandBus) {}

  async createOffer(input: CreateOfferInput) {
    await this.commandBus.execute(new CreateOfferCommand(input));
  }
}
