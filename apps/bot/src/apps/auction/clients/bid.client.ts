import { Injectable, Logger } from '@nestjs/common';
import { ThreadChannel } from 'discord.js';
import { CreateBidsInput } from '@lib/domains/auction/application/commands/create-bids/create-bids.input';
import { CreateBidsCommand } from '@lib/domains/auction/application/commands/create-bids/create-bids.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { BidParser } from '../parsers/bid.parser';
import { BidMessageWithUser } from '../interfaces/bid.interfaces';

@Injectable()
export class BidClient extends UserImageClient {
  constructor(readonly bidParser: BidParser) {
    super();
  }

  private readonly logger = new Logger(BidClient.name);

  async createBids(input: CreateBidsInput) {
    await this.commandBus.execute(new CreateBidsCommand({ input }));
  }

  async createBidsFromBidMessageWithUsers(
    threadChannel: ThreadChannel,
    bidMessageWithUsers: BidMessageWithUser[],
  ) {
    const bidInputs = this.bidParser.parseCreateBidInputs(threadChannel, bidMessageWithUsers);
    await this.createBids({ bidInputs });

    this.logger.log(`bid<@${bidInputs.length}> created`);
  }
}
