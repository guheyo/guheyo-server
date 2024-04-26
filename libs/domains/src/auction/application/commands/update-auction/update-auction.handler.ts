import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { UpdateAuctionCommand } from './update-auction.command';
import { AuctionSavePort } from '../../ports/out/auction.save.port';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';

@CommandHandler(UpdateAuctionCommand)
export class UpdateAuctionHandler implements ICommandHandler<UpdateAuctionCommand> {
  constructor(
    @Inject('AuctionLoadPort') private auctionLoadPort: AuctionLoadPort,
    @Inject('AuctionSavePort') private auctionSavePort: AuctionSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateAuctionCommand): Promise<void> {
    let auction = await this.auctionLoadPort.findById(command.id);
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_NOT_FOUND);

    auction = this.publisher.mergeObjectContext(auction);
    auction.update(command);
    await this.auctionSavePort.save(auction);
    auction.commit();
  }
}
