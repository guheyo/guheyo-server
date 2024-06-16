import { Injectable } from '@nestjs/common';
import { Collection, Message, ThreadChannel } from 'discord.js';
import { CreateBidCommand } from '@lib/domains/auction/application/commands/create-bid/create-bid.command';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommentParser } from '../../comment/parsers/comment.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class BidParser extends CommentParser {
  parseCreateBidCommands(
    threadChannel: ThreadChannel,
    messageWithUsers: MessageWithUser[],
  ): CreateBidCommand[] {
    return messageWithUsers.map((messageWithUser) =>
      this.parseCreateBidCommand({
        threadChannel,
        message: messageWithUser.message,
        user: messageWithUser.user,
      }),
    );
  }

  parseCreateBidCommand({
    threadChannel,
    message,
    user,
  }: {
    threadChannel: ThreadChannel;
    message: Message;
    user: MyUserResponse;
  }) {
    const embed = message.embeds[0];
    console.log(embed);

    return {
      id: this.parseIdFromMessageId(message.id),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      price: 0,
      priceCurrency: 'krw',
      auctionId: this.parseIdFromChannelId(threadChannel.id),
      userId: user.id,
      userAgent: DISCORD,
    };
  }

  extractSocialIdAndPrice(embedDescription: string) {
    const bidRegex = /<@(\d+)> (\d+) 입찰/g;
    const match = bidRegex.exec(embedDescription);
    if (!match) return null;

    return {
      socialId: match[1],
      price: parseInt(match[2], 10),
    };
  }

  extractSocialIdAndPricesFromMessages(embedMessages: Collection<string, Message>) {
    return embedMessages
      .map((embedMessage) => {
        const socialIdAndPrice = this.extractSocialIdAndPrice(embedMessage.embeds[0].description!);
        if (!socialIdAndPrice) return null;
        return {
          ...embedMessage,
          socialId: socialIdAndPrice.socialId,
          price: socialIdAndPrice.price,
        };
      })
      .filter(Boolean);
  }
}
