import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { Injectable } from '@nestjs/common';
import { CreateAuctionInput } from '@lib/domains/auction/application/commands/create-auction/create-auction.input';
import { AUCTION, AUCTION_CLOSED } from '@lib/domains/auction/domain/auction.constants';
import { SHIPPING_FREE } from '@lib/shared/shipping/shipping.constants';

@Injectable()
export class AuctionParser extends GroupParser {
  parseCreateAuctionInput(threadPost: ThreadPost, group: GroupResponse): CreateAuctionInput {
    const channelName = threadPost.tagNames[0];
    const post = {
      id: this.parseIdFromChannel(threadPost.threadChannel),
      createdAt: threadPost.starterMessage.createdAt,
      updatedAt: threadPost.starterMessage.editedAt || threadPost.starterMessage.createdAt,
      type: AUCTION,
      title: threadPost.threadChannel.name,
      groupId: group.id,
      tagIds: [],
      categoryId: this.parseCategoryId(channelName, group),
    };

    return {
      id: this.parseIdFromMessage(threadPost.starterMessage),
      createdAt: post.createdAt,
      originalEndDate: post.createdAt,
      extendedEndDate: post.createdAt,
      status: AUCTION_CLOSED,
      post,
      content: threadPost.starterMessage.content,
      shippingCost: 0,
      shippingType: SHIPPING_FREE,
    };
  }
}
