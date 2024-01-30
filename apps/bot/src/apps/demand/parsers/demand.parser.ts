import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { DemandErrorMessage } from './demand.error-message';

@Injectable()
export class DemandParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtb[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(DemandErrorMessage.INVALID_DEMAND_FORMAT);

    return {
      id: this.parseIdFromMessage(message),
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      description: match[3].trim(),
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateDemandInput {
    const dealSummary = this.parseDealSummary(message);

    return {
      ...dealSummary,
      priceCurrency: 'KRW',
      businessFunction: 'BUY',
      status: 'OPEN',
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
      buyerId: userId,
    };
  }

  parseUpdateDealInput(message: Message<boolean>): UpdateDemandInput {
    return this.parseDealSummary(message);
  }
}
