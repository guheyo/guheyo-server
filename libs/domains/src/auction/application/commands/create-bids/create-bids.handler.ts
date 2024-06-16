import { CommandHandler } from '@nestjs/cqrs';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BidEntity } from '@lib/domains/auction/domain/bid.entity';
import { CreateBidsCommand } from './create-bids.command';
import { BidResponse } from '../../dtos/bid.response';

@CommandHandler(CreateBidsCommand)
export class CreateBidsHandler extends PrismaCommandHandler<CreateBidsCommand, BidResponse> {
  constructor() {
    super(BidResponse);
  }

  async execute(command: CreateBidsCommand): Promise<void> {
    const existingBids = await this.prismaService.bid.findMany({
      where: {
        id: {
          in: command.bidCommands.map((bidCommand) => bidCommand.id),
        },
      },
      select: {
        id: true,
      },
    });

    const newBids = command.bidCommands.filter(
      (bidCommand) => !existingBids.some((existingBid) => existingBid.id === bidCommand.id),
    );

    const bidsToCreate = newBids.map((bidCommand) => new BidEntity(bidCommand));

    await this.prismaService.bid.createMany({
      data: bidsToCreate,
    });
  }
}
