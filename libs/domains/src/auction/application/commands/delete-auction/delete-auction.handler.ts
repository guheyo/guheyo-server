import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { DeleteAuctionCommand } from './delete-auction.command';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { AuctionSavePort } from '../../ports/out/auction.save.port';

@CommandHandler(DeleteAuctionCommand)
export class DeleteAuctionHandler implements ICommandHandler<DeleteAuctionCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('AuctionSavePort') private auctionSavePort: AuctionSavePort,
  ) {}

  async execute(command: DeleteAuctionCommand): Promise<void> {
    const auction = await this.auctionLoadPort.findById(command.id);
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_IS_NOT_FOUND);

    await this.auctionSavePort.delete(auction);
  }
}
