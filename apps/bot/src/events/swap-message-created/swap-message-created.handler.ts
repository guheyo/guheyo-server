import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { ParseGuildPipe } from '@app/bot/apps/guild/pipes/parse-guild.pipe';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { SwapParser } from '@app/bot/apps/swap/parsers/swap.parser';
import { UserImageParser } from '@app/bot/apps/user-image/parsers/user-image.parser';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageCreatedHandler {
  private readonly logger = new Logger(SwapMessageCreatedHandler.name);

  constructor(
    private readonly swapParser: SwapParser,
    private readonly userImageParser: UserImageParser,
    private readonly swapClient: SwapClient,
  ) {}

  @On('messageCreate')
  public async onCreateSwapMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context(ParseGuildPipe)
    guild: GuildResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      user.id,
      message,
      'swap',
    );
    const createSwapInput = this.swapParser.parseCreateDealInput(user.id, message, guild.id);
    await this.swapClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.swapClient.createSwap(createSwapInput);
    this.logger.log(`Swap<@${createSwapInput.id}> created`);
  }
}
