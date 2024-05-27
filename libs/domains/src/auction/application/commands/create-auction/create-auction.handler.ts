import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { CreateAuctionCommand } from './create-auction.command';
import { AuctionSavePort } from '../../ports/out/auction.save.port';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';

@CommandHandler(CreateAuctionCommand)
export class CreateAuctionHandler implements ICommandHandler<CreateAuctionCommand> {
  constructor(
    @Inject('AuctionSavePort') private savePort: AuctionSavePort,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateAuctionCommand): Promise<void> {
    await this.savePort.create(
      new AuctionEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
        }),
      }),
    );
    let auction = await this.loadPort.findById(command.id);
    if (!auction)
      throw new InternalServerErrorException(AuctionErrorMessage.AUCTION_CREATION_FAILED);

    auction = this.publisher.mergeObjectContext(auction);
    auction.create(command.post.tagIds || []);
    auction.commit();
  }
}
