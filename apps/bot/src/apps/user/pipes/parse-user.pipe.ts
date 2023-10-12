import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { UserParser } from '@app/bot/apps/user/parsers/user.parser';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';

@Injectable()
export class ParseUserPipe implements PipeTransform {
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
