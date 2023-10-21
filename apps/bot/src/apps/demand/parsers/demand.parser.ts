import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { pick } from 'lodash';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { DemandErrorMessage } from './demand.error-message';

@Injectable()
export class DemandParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wtb[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(content);
  }

  parseCreateDealInput(userId: string, message: Message): CreateDemandInput {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(DemandErrorMessage.INVALID_DEMAND_FORMAT);

    return {
      id: this.parseIdFromMessage(message),
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      priceCurrency: 'KRW',
      description: match[3].trim(),
      businessFunction: 'BUY',
      status: 'ON_SALE',
      source: 'discord',
      guildId: this.parseGuildIdFromMessage(message),
      productCategoryId: this.parseProductCategoryIdFromMessage(message),
      buyerId: userId,
    };
  }

  parseUpdateDealInput(userId: string, message: Message<boolean>): UpdateDemandInput {
    return {
      ...pick(this.parseCreateDealInput(userId, message), ['id', 'name', 'description', 'price']),
      source: 'discord',
    };
  }
}
