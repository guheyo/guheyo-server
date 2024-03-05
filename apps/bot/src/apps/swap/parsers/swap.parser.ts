import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { SwapErrorMessage } from './swap.error-message';

@Injectable()
export class SwapParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtt[\r\n](.*)[\s\S]+wttf[\r\n](.*)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(SwapErrorMessage.INVALID_SWAP_FORMAT);

    return {
      id: this.parseIdFromMessage(message),
      name0: match[1].trim(),
      name1: match[2].trim(),
      description0: match[3].trim(),
      price: 0,
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateSwapInput {
    const dealSummary = this.parseDealSummary(message);

    return {
      ...dealSummary,
      priceCurrency: 'krw',
      businessFunction: 'trade',
      status: 'open',
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
      proposerId: userId,
    };
  }

  parseUpdateDealInput(message: Message<boolean>): UpdateSwapInput {
    return this.parseDealSummary(message);
  }
}
