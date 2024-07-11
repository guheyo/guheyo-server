import { Injectable, Logger } from '@nestjs/common';
import { Message, PartialMessage } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OfferBusinessFunction } from '@lib/domains/offer/domain/offer.types';
import { CreateOfferCommand } from '@lib/domains/offer/application/commands/create-offer/create-offer.command';
import { UpdateOfferCommand } from '@lib/domains/offer/application/commands/update-offer/update-offer.command';
import { DeleteOfferCommand } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.command';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';
import { RpcException } from '@nestjs/microservices';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { OfferParser } from '../parsers/abstracts/offer.parser';
import { OfferErrorMessage } from '../parsers/abstracts/offer.error-message';

@Injectable()
export abstract class OfferClient extends UserImageClient {
  constructor(
    protected readonly businessFunction: OfferBusinessFunction,
    protected readonly offerParser: OfferParser,
  ) {
    super();
  }

  private readonly logger = new Logger(OfferClient.name);

  async createOffer({ input, user }: { input: CreateOfferInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateOfferCommand({ input, user, userAgent: DISCORD }));
  }

  async updateOffer({ input, user }: { input: UpdateOfferInput; user: MyUserResponse }) {
    await this.commandBus.execute(new UpdateOfferCommand({ input, user }));
  }

  async deleteOffer({ args, user }: { args: DeleteOfferArgs; user: MyUserResponse }) {
    await this.commandBus.execute(new DeleteOfferCommand({ args, user }));
  }

  async createOfferFromMessage(user: MyUserResponse, message: Message, group: GroupResponse) {
    if (this.businessFunction !== 'buy' && message.attachments.size === 0) {
      throw new RpcException(OfferErrorMessage.NOT_FOUND_OFFER_ATTACHMENTS);
    }
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      message,
      OFFER,
    );
    const createOfferInput = this.offerParser.parseCreateOfferInput(message, group);

    await this.uploadAndCreateAttachments(user, uploadUserImageInputList, OFFER);
    await this.createOffer({ input: createOfferInput, user });
    this.logger.log(`${this.businessFunction}<@${createOfferInput.id}> created`);
  }

  async updateOfferFromMessage(user: MyUserResponse, message: Message) {
    const updateOfferInput = this.offerParser.parseUpdateOfferInput(message);
    await this.updateOffer({ input: updateOfferInput, user });
    this.logger.log(`${this.businessFunction}<@${updateOfferInput.id}> updated`);
  }

  async deleteOfferFromMessage(user: MyUserResponse, message: Message | PartialMessage) {
    const args = this.offerParser.parseDeleteOfferArgs(message);
    await this.deleteOffer({ args, user });
    this.logger.log(`${this.businessFunction}<@${args.id}> deleted`);
  }
}
