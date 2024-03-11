import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { BumpDemandCommand } from './bump-demand.command';
import { DemandSavePort } from '../../ports/out/demand.save.port';
import { DemandLoadPort } from '../../ports/out/demand.load.port';

@CommandHandler(BumpDemandCommand)
export class BumpDemandHandler implements ICommandHandler<BumpDemandCommand> {
  constructor(
    @Inject('DemandSavePort') private demandSavePort: DemandSavePort,
    @Inject('DemandLoadPort') private demandLoadPort: DemandLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BumpDemandCommand): Promise<void> {
    let demand = await this.demandLoadPort.findById(command.input.demandId);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_IS_NOT_FOUND);
    if (!demand.isAuthorized(command.input.demandId))
      throw new ForbiddenException(DemandErrorMessage.DEMAND_CHANGES_FROM_UNAUTHORIZED_USER);
    if (!demand.canBump())
      throw new ForbiddenException(DemandErrorMessage.DEMAND_BUMP_STUCK_ON_COOLDOWN);

    demand = this.publisher.mergeObjectContext(demand);
    demand.bump(command.input);
    await this.demandSavePort.save(demand);
    demand.commit();
  }
}
