import { UserClient } from '@app/bot/apps/user/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { UserParser } from '@app/bot/apps/user/user.parser';
import { SimpleUser } from '@app/bot/apps/user/user.types';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(
    private readonly userClient: UserClient,
    private readonly userParser: UserParser,
  ) {}

  async transform(
    [member]: ContextOf<'guildMemberAdd' | 'guildMemberUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<SimpleUser> {
    const user = await this.userClient.findUserBySocialAccount('discord', member.id);
    if (user)
      return {
        id: user.id,
        username: user.username,
      };

    const fetchedMember = await member.fetch();
    const input = this.userParser.parseCreateUserFromDiscordInput(fetchedMember);
    return this.userClient.createUserFromDiscord(input);
  }
}
