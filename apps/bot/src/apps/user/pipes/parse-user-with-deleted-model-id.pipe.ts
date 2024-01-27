import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';
import { UserErrorMessage } from '@app/bot/apps/user/parsers/user.error-message';
import { UserParser } from '@app/bot/apps/user/parsers/user.parser';

@Injectable()
export class ParseUserWithDeletedModelIdPipe implements PipeTransform {
  constructor(
    private readonly userClient: UserClient,
    private readonly userParser: UserParser,
  ) {}

  async transform(
    [message]: ContextOf<'messageDelete'>,
    metadata: ArgumentMetadata,
  ): Promise<UserWithDeletedModelId> {
    const discordMember = message.member;
    if (!discordMember) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);

    const user = await this.userClient.findUserBySocialAccount('discord', discordMember.id);
    if (user)
      return {
        user: {
          id: user.id,
          username: user.username,
        },
        deletedModelId: this.userParser.parseIdFromMessage(message),
      };

    const input = this.userParser.parseCreateUserFromDiscordInput(discordMember);
    await this.userClient.createUserFromDiscord(input);
    return {
      user: {
        id: input.id,
        username: input.username,
      },
      deletedModelId: this.userParser.parseIdFromMessage(message),
    };
  }
}
