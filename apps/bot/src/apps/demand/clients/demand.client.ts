import { Injectable } from '@nestjs/common';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { CreateDemandCommand } from '@lib/domains/demand/application/commands/create-demand/create-demand.command';
import { UpdateDemandCommand } from '@lib/domains/demand/application/commands/update-demand/update-demand.command';
import { DeleteDemandCommand } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';

@Injectable()
export class DemandClient extends UserImageClient {
  async createDemand(input: CreateDemandInput) {
    await this.commandBus.execute(new CreateDemandCommand(input));
  }

  async updateDemand(input: UpdateDemandInput) {
    await this.commandBus.execute(new UpdateDemandCommand(input));
  }

  async deleteDemand(id: string) {
    await this.commandBus.execute(new DeleteDemandCommand(id));
  }
}
