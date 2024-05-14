import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { CreateAuctionCommand } from './create-auction.command';
import { AuctionSavePort } from '../../ports/out/auction.save.port';

@CommandHandler(CreateAuctionCommand)
export class CreateAuctionHandler implements ICommandHandler<CreateAuctionCommand> {
  constructor(
    @Inject('AuctionSavePort') private savePort: AuctionSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateAuctionCommand): Promise<void> {
    const auction = this.publisher.mergeObjectContext(
      new AuctionEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
        }),
      }),
    );
    auction.create(command.post.tagIds || []);
    await this.savePort.create(auction);
    auction.commit();
  }
}
