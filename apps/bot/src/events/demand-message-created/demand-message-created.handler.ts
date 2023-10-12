import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { ParseCreateDemandInputWithUploadUserImageInputListPipe } from '@app/bot/apps/demand/pipes/parse-create-demand-input-with-upload-user-image-input-list.pipe';
import { CreateDemandInputWithUploadUserImageInputList } from '@app/bot/apps/demand/parsers/demand.types';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageCreatedHandler {
  private readonly logger = new Logger(DemandMessageCreatedHandler.name);

  constructor(private readonly demandClient: DemandClient) {}

  @On('messageCreate')
  public async onCreateDemandMessage(
    @Context(ParseUserWithMessagePipe, ParseCreateDemandInputWithUploadUserImageInputListPipe)
    { createDemandInput, uploadUserImageInputList }: CreateDemandInputWithUploadUserImageInputList,
  ) {
    await this.demandClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.demandClient.createDemand(createDemandInput);
    this.logger.log(`Demand<@${createDemandInput.id}> created`);
  }
}
