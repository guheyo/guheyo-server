import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseCreateSwapInputWithUploadUserImageInputListPipe } from '@app/bot/apps/swap/pipes/parse-create-swap-input-with-upload-user-image-input-list.pipe';
import { CreateSwapInputWithUploadUserImageInputList } from '@app/bot/apps/swap/parsers/swap.types';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageCreatedHandler {
  private readonly logger = new Logger(SwapMessageCreatedHandler.name);

  constructor(private readonly swapClient: SwapClient) {}

  @On('messageCreate')
  public async onCreateSwapMessage(
    @Context(ParseUserWithMessagePipe, ParseCreateSwapInputWithUploadUserImageInputListPipe)
    { createSwapInput, uploadUserImageInputList }: CreateSwapInputWithUploadUserImageInputList,
  ) {
    await this.swapClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.swapClient.createSwap(createSwapInput);
    this.logger.log(`Swap<@${createSwapInput.id}> created`);
  }
}
