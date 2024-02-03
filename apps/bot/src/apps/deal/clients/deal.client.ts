import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { DealParser } from '../parsers/abstracts/deal.parser';
import { DealType } from '../parsers/deal.types';

@Injectable()
export abstract class DealClient extends UserImageClient {
  constructor(
    protected readonly dealType: DealType,
    protected readonly dealParser: DealParser,
  ) {
    super();
  }

  public readonly logger = new Logger(DealClient.name);

  abstract createDeal(input: CreateOfferInput | CreateDemandInput | CreateSwapInput): void;

  abstract updateDeal(input: UpdateOfferInput | UpdateDemandInput | UpdateSwapInput): void;

  abstract deleteDeal(id: string): void;

  async createDealFromMessage(userId: string, message: Message, group: GroupResponse) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      userId,
      message,
      this.dealType,
    );
    const createDealInput = this.dealParser.parseCreateDealInput(userId, message, group);
    await this.uploadAndCreateAttachments(uploadUserImageInputList, this.dealType);
    await this.createDeal(createDealInput);
    this.logger.log(`${this.dealType}<@${createDealInput.id}> created`);
  }

  async updateDealFromMessage(message: Message) {
    const updateDealInput = this.dealParser.parseUpdateDealInput(message);
    await this.updateDeal(updateDealInput);
    this.logger.log(`${this.dealType}<@${updateDealInput.id}> updated`);
  }

  async deleteDealFromMessage(id: string) {
    await this.deleteDeal(id);
    this.logger.log(`${this.dealType}<@${id}> deleted`);
  }
}
