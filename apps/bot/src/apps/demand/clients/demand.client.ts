import { Injectable } from '@nestjs/common';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { CreateDemandCommand } from '@lib/domains/demand/application/commands/create-demand/create-demand.command';
import { UpdateDemandCommand } from '@lib/domains/demand/application/commands/update-demand/update-demand.command';
import { DeleteDemandCommand } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.command';
import { DeleteDemandArgs } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.args';
import { DemandParser } from '../parsers/demand.parser';
import { DealClient } from '../../deal/clients/deal.client';

@Injectable()
export class DemandClient extends DealClient {
  constructor(protected readonly dealParser: DemandParser) {
    super('demand', dealParser);
  }

  async createDeal(input: CreateDemandInput) {
    await this.commandBus.execute(new CreateDemandCommand(input));
  }

  async updateDeal(input: UpdateDemandInput) {
    await this.commandBus.execute(new UpdateDemandCommand(input));
  }

  async deleteDeal(args: DeleteDemandArgs) {
    await this.commandBus.execute(new DeleteDemandCommand(args));
  }
}
