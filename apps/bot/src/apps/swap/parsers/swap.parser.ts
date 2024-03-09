import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message, PartialMessage } from 'discord.js';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DeleteSwapArgs } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.args';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { SwapErrorMessage } from './swap.error-message';

@Injectable()
export class SwapParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtt[\r\n](.*)[\s\S]+wttf[\r\n](.*)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(userId: string, message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(SwapErrorMessage.INVALID_SWAP_FORMAT);

    return {
      proposerId: userId,
      id: this.parseIdFromMessage(message),
      name0: match[1].trim(),
      name1: match[2].trim(),
      description0: match[3].trim(),
      price: 0,
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateSwapInput {
    const dealSummary = this.parseDealSummary(userId, message);

    return {
      ...dealSummary,
      priceCurrency: 'krw',
      businessFunction: 'trade',
      status: 'open',
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
    };
  }

  parseUpdateDealInput(userId: string, message: Message<boolean>): UpdateSwapInput {
    return this.parseDealSummary(userId, message);
  }

  parseDeleteDealArgs(userId: string, message: Message | PartialMessage): DeleteSwapArgs {
    return {
      proposerId: userId,
      id: this.parseIdFromMessage(message),
    };
  }
}
