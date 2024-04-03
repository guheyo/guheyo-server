import { Message, PartialMessage, TextChannel } from 'discord.js';
import { RpcException } from '@nestjs/microservices';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { DeleteDemandArgs } from '@lib/domains/demand/application/commands/delete-demand/delete-demand.args';
import { DeleteSwapArgs } from '@lib/domains/swap/application/commands/delete-swap/delete-swap.args';
import { DealErrorMessage } from './deal.error-message';

export abstract class DealParser extends GroupParser {
  abstract matchFormat(content: string): RegExpExecArray | null;

  matchProductCategoryName(channelName: string): string | null {
    const re = /([a-zA-Z가-힣]*)-(삽니다|팝니다|교환합니다|의뢰합니다|구합니다)/;
    const match = re.exec(channelName);
    return match ? match[1] : null;
  }

  abstract parseCreateDealInput(
    userId: string,
    message: Message,
    group: GroupResponse,
  ): CreateOfferInput | CreateDemandInput | CreateSwapInput;

  abstract parseUpdateDealInput(
    userId: string,
    message: Message,
  ): UpdateOfferInput | UpdateDemandInput | UpdateSwapInput;

  abstract parseDeleteDealArgs(
    userId: string,
    message: Message | PartialMessage,
  ): DeleteOfferArgs | DeleteDemandArgs | DeleteSwapArgs;

  parsePrice(price: string) {
    return Number(Number(price).toFixed(1)) * 10000;
  }

  parseProductCategoryName(channelName: string): string {
    const categoryName = this.matchProductCategoryName(channelName);
    if (!categoryName)
      throw new RpcException(DealErrorMessage.INVALID_PRODUCT_CATEGORY_NAME_FORMAT);
    return categoryName;
  }

  parseProductCategoryId(message: Message, group: GroupResponse): string {
    const channel = message.channel as TextChannel;
    const categoryName = this.parseProductCategoryName(channel.name);
    const category = group.productCategories.find((c) => c.name === categoryName);
    if (!category) throw new RpcException(DealErrorMessage.NOT_FOUND_PRODUCT_CATEGORY);
    return category.id;
  }
}
