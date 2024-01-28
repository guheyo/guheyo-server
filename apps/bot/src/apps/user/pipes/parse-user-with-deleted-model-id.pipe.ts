import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';
import { UserErrorMessage } from '@app/bot/apps/user/parsers/user.error-message';

@Injectable()
export class ParseUserWithDeletedModelIdPipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [message]: ContextOf<'messageDelete'>,
    metadata: ArgumentMetadata,
  ): Promise<UserWithDeletedModelId> {
    const discordMember = message.member;
    if (!discordMember) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);

    const user = await this.userClient.fetchSimpleUser('discord', discordMember);
    return {
      user,
      deletedModelId: this.userClient.userParser.parseIdFromMessage(message),
    };
  }
}
