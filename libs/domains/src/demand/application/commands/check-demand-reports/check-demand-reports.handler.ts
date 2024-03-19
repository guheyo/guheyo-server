import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { CheckDemandReportsCommand } from './check-demand-reports.command';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(CheckDemandReportsCommand)
export class CheckDemandReportsHandler implements ICommandHandler<CheckDemandReportsCommand> {
  constructor(
    @Inject('DemandLoadPort') private loadPort: DemandLoadPort,
    @Inject('DemandSavePort') private savePort: DemandSavePort,
  ) {}

  async execute(event: CheckDemandReportsCommand) {
    if (event.type !== 'demand') return;

    const demand = await this.loadPort.findById(event.refId);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);

    demand.checkReports();
    this.savePort.save(demand);
  }
}
