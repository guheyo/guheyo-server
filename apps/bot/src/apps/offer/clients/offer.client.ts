import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DealClient } from '../../deal/clients/deal.client';
import { OfferParser } from '../parsers/offer.parser';

@Injectable()
export class OfferClient extends DealClient {
  constructor(protected readonly dealParser: OfferParser) {
    super('offer', dealParser);
  }

  async createDeal({ input, user }: { input: CreateOfferInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateOfferCommand({ input, user }));
  }

  async updateDeal({ input, user }: { input: UpdateOfferInput; user: MyUserResponse }) {
    await this.commandBus.execute(new UpdateOfferCommand({ input, user }));
  }

  async deleteDeal(args: DeleteOfferArgs) {
    await this.commandBus.execute(new DeleteOfferCommand(args));
  }
}
