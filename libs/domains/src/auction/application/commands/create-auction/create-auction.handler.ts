import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { AuctionEntity } from '@lib/domains/auction/domain/auction.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { AUCTION } from '@lib/domains/auction/domain/auction.constants';
import { CreateAuctionCommand } from './create-auction.command';
import { AuctionSavePort } from '../../ports/out/auction.save.port';
import { AuctionLoadPort } from '../../ports/out/auction.load.port';
import { AuctionResponse } from '../../dtos/auction.response';

@CommandHandler(CreateAuctionCommand)
export class CreateAuctionHandler extends PrismaCommandHandler<
  CreateAuctionCommand,
  AuctionResponse
> {
  constructor(
    @Inject('AuctionSavePort') private savePort: AuctionSavePort,
    @Inject('AuctionLoadPort') private loadPort: AuctionLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(AuctionResponse);
  }

  async execute(command: CreateAuctionCommand): Promise<void> {
    const image = await this.prismaService.userImage.findFirst({
      where: {
        type: AUCTION,
        refId: command.id,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    await this.savePort.create(
      new AuctionEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
          thumbnail: image?.url,
          userAgent: command.userAgent,
          ipAddress: command.ipAddress,
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
