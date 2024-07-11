import { Injectable, Logger } from '@nestjs/common';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { CreateAuctionInput } from '@lib/domains/auction/application/commands/create-auction/create-auction.input';
import { CreateAuctionCommand } from '@lib/domains/auction/application/commands/create-auction/create-auction.command';
import { AUCTION } from '@lib/domains/auction/domain/auction.constants';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { AuctionParser } from '../parsers/auction.parser';

@Injectable()
export class AuctionClient extends UserImageClient {
  constructor(protected readonly auctionParser: AuctionParser) {
    super();
  }

  private readonly logger = new Logger(AuctionClient.name);

  async createAuction({ input, user }: { input: CreateAuctionInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateAuctionCommand({ input, user, userAgent: DISCORD }));
  }

  async createAuctionFromPost(user: MyUserResponse, threadPost: ThreadPost, group: GroupResponse) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      threadPost.starterMessage,
      AUCTION,
    );
    const createAuctionInput = this.auctionParser.parseCreateAuctionInput(threadPost, group);

    await this.uploadAndCreateAttachments(user, uploadUserImageInputList, AUCTION);
    await this.createAuction({ input: createAuctionInput, user });
    this.logger.log(`auction<@${createAuctionInput.id}> created`);
  }
}
