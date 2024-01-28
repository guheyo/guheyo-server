import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [member]: ContextOf<'guildMemberAdd' | 'guildMemberUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<SimpleUser> {
    const fetchedMember = await member.fetch();
    return this.userClient.fetchSimpleUser('discord', fetchedMember);
  }
}
