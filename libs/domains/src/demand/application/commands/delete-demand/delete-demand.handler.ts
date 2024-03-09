import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { DeleteDemandCommand } from './delete-demand.command';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(DeleteDemandCommand)
export class DeleteDemandHandler implements ICommandHandler<DeleteDemandCommand> {
  constructor(
    @Inject('DemandLoadPort') private demandLoadPort: DemandLoadPort,
    @Inject('DemandSavePort') private demandSavePort: DemandSavePort,
  ) {}

  async execute(command: DeleteDemandCommand): Promise<void> {
    const demand = await this.demandLoadPort.findById(command.id);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_IS_NOT_FOUND);
    if (!demand.isAuthorized(command.buyerId))
      throw new ForbiddenException(DemandErrorMessage.DEMAND_DELETE_COMMAND_FROM_UNAUTHORIZED_USER);

    await this.demandSavePort.delete(demand);
  }
}
