import { Inject, Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { CreateDemandCommand } from '@lib/domains/demand/application/commands/create-demand/create-demand.command';
import { UpdateDemandCommand } from '@lib/domains/demand/application/commands/update-demand/update-demand.command';
import { DeleteDemandCommand } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.command';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { DemandParser } from '../parsers/demand.parser';

@Injectable()
export class DemandClient extends UserImageClient {
  @Inject()
  private readonly demandParser: DemandParser;

  private readonly logger = new Logger(DemandClient.name);

  async createDemand(input: CreateDemandInput) {
    await this.commandBus.execute(new CreateDemandCommand(input));
  }

  async updateDemand(input: UpdateDemandInput) {
    await this.commandBus.execute(new UpdateDemandCommand(input));
  }

  async deleteDemand(id: string) {
    await this.commandBus.execute(new DeleteDemandCommand(id));
  }

  async createDemandFromMessage(userId: string, message: Message, guild: GuildResponse) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      userId,
      message,
      'demand',
    );
    const createDemandInput = this.demandParser.parseCreateDealInput(userId, message, guild);
    await this.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.createDemand(createDemandInput);
    this.logger.log(`Demand<@${createDemandInput.id}> created`);
  }

  async updateDemandFromMessage(message: Message) {
    const updateDemandInput = this.demandParser.parseUpdateDealInput(message);
    await this.updateDemand(updateDemandInput);
    this.logger.log(`Demand<@${updateDemandInput.id}> updated`);
  }
}
