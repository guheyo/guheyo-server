import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserErrorMessage } from '@app/bot/apps/user/parsers/user.error-message';
import { SimpleUser } from '../parsers/user.types';

@Injectable()
export class ParseUserFromDeletedMessagePipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [message]: ContextOf<'messageDelete'>,
    metadata: ArgumentMetadata,
  ): Promise<SimpleUser> {
    const discordMember = message.member;
    if (!discordMember) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);

    return this.userClient.fetchSimpleUser('discord', discordMember);
  }
}
