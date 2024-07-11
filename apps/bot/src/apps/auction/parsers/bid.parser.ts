import { Injectable } from '@nestjs/common';
import { Message, ThreadChannel } from 'discord.js';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateBidInput } from '@lib/domains/auction/application/commands/create-bid/create-bid.input';
import { BID } from '@lib/domains/auction/domain/bid.constants';
import { CommentParser } from '../../comment/parsers/comment.parser';
import { BidMessageWithUser, MessageWithSocialIdAndPrice } from '../interfaces/bid.interfaces';

@Injectable()
export class BidParser extends CommentParser {
  parseCreateBidInputs(
    threadChannel: ThreadChannel,
    bidMessageWithUsers: BidMessageWithUser[],
  ): CreateBidInput[] {
    return bidMessageWithUsers.map((messageWithSocialIdPriceAndUser) =>
      this.parseCreateBidInput({
        threadChannel,
        message: messageWithSocialIdPriceAndUser.message,
        user: messageWithSocialIdPriceAndUser.user,
        price: messageWithSocialIdPriceAndUser.price,
      }),
    );
  }

  parseCreateBidInput({
    threadChannel,
    message,
    user,
    price,
  }: {
    threadChannel: ThreadChannel;
    message: Message;
    user: MyUserResponse;
    price: number;
  }): CreateBidInput {
    return {
      id: this.parseIdFromMessageId(message.id),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      price,
      priceCurrency: 'krw',
      auctionId: this.parseIdFromChannelId(threadChannel.id),
      userId: user.id,
      status: BID,
      userAgent: DISCORD,
    };
  }

  extractSocialIdAndPrice(embedDescription: string) {
    const bidRegex = /<@(\d+)> (\d+) 입찰/g;
    const match = bidRegex.exec(embedDescription);
    if (!match) return null;

    return {
      socialId: match[1],
      price: parseInt(match[2], 10) * 10000,
    };
  }

  extractSocialIdAndPricesFromMessages(
    messageWithEmbeds: Message[],
  ): MessageWithSocialIdAndPrice[] {
    return messageWithEmbeds
      .map((messageWithEmbed) => {
        const socialIdAndPrice = this.extractSocialIdAndPrice(
          messageWithEmbed.embeds[0].description!,
        );
        if (!socialIdAndPrice) return null;
        return {
          message: messageWithEmbed,
          socialId: socialIdAndPrice.socialId,
          price: socialIdAndPrice.price,
        };
      })
      .filter((item): item is MessageWithSocialIdAndPrice => item !== null);
  }
}
