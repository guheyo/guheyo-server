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
          in: command.bidInputs.map((bidInput) => bidInput.id),
        },
      },
      select: {
        id: true,
      },
    });

    const newBids = command.bidInputs.filter(
      (bidInput) => !existingBids.some((existingBid) => existingBid.id === bidInput.id),
    );

    const bidsToCreate = newBids.map((bidInput) => new BidEntity(bidInput));

    await this.prismaService.bid.createMany({
      data: bidsToCreate,
    });
  }
}
