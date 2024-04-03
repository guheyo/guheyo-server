import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { DAY_HOURS } from '@lib/domains/offer/domain/offer.constants';
import { DAILY_DEMAND_POSTING_LIMIT } from '@lib/domains/demand/domain/demand.constants';
import { BumpDemandCommand } from './bump-demand.command';
import { DemandSavePort } from '../../ports/out/demand.save.port';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandPreviewResponse } from '../../dtos/demand-preview.response';

@CommandHandler(BumpDemandCommand)
export class BumpDemandHandler extends PrismaCommandHandler<
  BumpDemandCommand,
  DemandPreviewResponse
> {
  constructor(
    @Inject('DemandSavePort') private demandSavePort: DemandSavePort,
    @Inject('DemandLoadPort') private demandLoadPort: DemandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(DemandPreviewResponse);
  }

  async execute(command: BumpDemandCommand): Promise<DemandPreviewResponse> {
    let demand = await this.demandLoadPort.findById(command.input.demandId);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);
    if (!demand.isAuthorized(command.user.id))
      throw new ForbiddenException(DemandErrorMessage.DEMAND_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!demand.canBump())
      throw new ForbiddenException(DemandErrorMessage.DEMAND_BUMP_STUCK_ON_COOLDOWN);

    const countDailyDemandPostingInSameCategory = await this.prismaService.demand.countDemand({
      buyerId: demand.buyerId,
      productCategoryId: demand.productCategoryId,
      fromHours: DAY_HOURS,
    });
    if (countDailyDemandPostingInSameCategory > DAILY_DEMAND_POSTING_LIMIT)
      throw new ForbiddenException(DemandErrorMessage.DAILY_DEMAND_POSTING_LIMIT_EXCEEDED);

    demand = this.publisher.mergeObjectContext(demand);
    demand.bump(command.input);
    await this.demandSavePort.save(demand);
    demand.commit();
    return this.parseResponse(demand);
  }
}
