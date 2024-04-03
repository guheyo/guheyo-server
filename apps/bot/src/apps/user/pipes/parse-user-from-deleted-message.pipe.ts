import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserErrorMessage } from '@app/bot/apps/user/parsers/user.error-message';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@Injectable()
export class ParseUserFromDeletedMessagePipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [message]: ContextOf<'messageDelete'>,
    metadata: ArgumentMetadata,
  ): Promise<MyUserResponse> {
    const discordMember = message.member;
    if (!discordMember) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);

    return this.userClient.fetchMyUser('discord', discordMember);
  }
}
