import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { pick } from 'lodash';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { SwapErrorMessage } from './swap.error-message';

@Injectable()
export class SwapParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtt[\r\n](.*)[\s\S]+wttf[\r\n](.*)([\s\S]*)/i;
    return re.exec(content);
  }

  parseCreateDealInput(userId: string, message: Message): CreateSwapInput {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(SwapErrorMessage.INVALID_SWAP_FORMAT);

    return {
      id: this.parseIdFromMessage(message),
      name0: match[1].trim(),
      name1: match[2].trim(),
      description0: match[3].trim(),
      price: 0,
      priceCurrency: 'KRW',
      businessFunction: 'TRADE',
      status: 'OPEN',
      source: 'discord',
      guildId: this.parseGuildIdFromMessage(message),
      productCategoryId: this.parseProductCategoryIdFromMessage(message),
      proposerId: userId,
    };
  }

  parseUpdateDealInput(userId: string, message: Message<boolean>): UpdateSwapInput {
    return {
      ...pick(this.parseCreateDealInput(userId, message), [
        'id',
        'name0',
        'name1',
        'description0',
        'price',
      ]),
      source: 'discord',
    };
  }
}
