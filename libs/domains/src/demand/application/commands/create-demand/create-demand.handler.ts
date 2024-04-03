import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DAILY_DEMAND_POSTING_LIMIT } from '@lib/domains/demand/domain/demand.constants';
import { CreateDemandCommand } from './create-demand.command';
import { DemandSavePort } from '../../ports/out/demand.save.port';
import { DemandResponse } from '../../dtos/demand.response';

@CommandHandler(CreateDemandCommand)
export class CreateDemandHandler extends PrismaCommandHandler<CreateDemandCommand, DemandResponse> {
  constructor(
    @Inject('DemandSavePort') private savePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(DemandResponse);
  }

  async execute(command: CreateDemandCommand): Promise<void> {
    if (command.buyerId !== command.user.id)
      throw new ForbiddenException(DemandErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const countDailyDemandPostingInSameCategory = await this.prismaService.demand.countDemand({
      buyerId: command.buyerId,
      productCategoryId: command.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailyDemandPostingInSameCategory > DAILY_DEMAND_POSTING_LIMIT)
      throw new ForbiddenException(DemandErrorMessage.DAILY_DEMAND_POSTING_LIMIT_EXCEEDED);

    const demand = this.publisher.mergeObjectContext(new DemandEntity(command));
    demand.create();
    await this.savePort.create(demand);
    demand.commit();
  }
}
