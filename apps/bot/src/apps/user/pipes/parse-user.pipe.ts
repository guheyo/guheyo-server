import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [member]: ContextOf<'guildMemberAdd' | 'guildMemberUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<MyUserResponse> {
    const fetchedMember = await member.fetch();
    return this.userClient.fetchMyUser('discord', fetchedMember);
  }
}
