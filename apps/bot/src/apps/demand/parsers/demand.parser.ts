import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message, PartialMessage } from 'discord.js';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DeleteDemandArgs } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.args';
import { DEMAND_OPEN } from '@lib/domains/demand/domain/demand.constants';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { DemandErrorMessage } from './demand.error-message';

@Injectable()
export class DemandParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtb[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(userId: string, message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(DemandErrorMessage.INVALID_DEMAND_FORMAT);

    return {
      buyerId: userId,
      id: this.parseIdFromMessage(message),
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      description: match[3].trim(),
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateDemandInput {
    const dealSummary = this.parseDealSummary(userId, message);

    return {
      ...dealSummary,
      priceCurrency: 'krw',
      businessFunction: 'buy',
      status: DEMAND_OPEN,
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
    };
  }

  parseUpdateDealInput(userId: string, message: Message<boolean>): UpdateDemandInput {
    return this.parseDealSummary(userId, message);
  }

  parseDeleteDealArgs(userId: string, message: Message | PartialMessage): DeleteDemandArgs {
    return {
      buyerId: userId,
      id: this.parseIdFromMessage(message),
    };
  }
}
