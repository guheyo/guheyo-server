import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { CommandChannelGuard } from '@app/bot/apps/command/guards/command-channel.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { GuildName } from '@app/bot/decorators/guild-name.decorator';

@GuildName('커스텀 키보드')
@Name('kakao')
@UseGuards(GroupGuard, CommandChannelGuard)
@Injectable()
export class KakaoRoleRequestedHandler {
  constructor(private readonly userClient: UserClient) {}

  @On('messageCreate')
  public async onRequestedKakaoRole(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    const { member } = message;
    if (!member) return;
    if (!message.guild) return;

    const provider = 'kakao';
    const socialRole = this.userClient.findSocialRole(await message.guild.roles.fetch(), provider);
    if (!socialRole) return;

    const memberHasRole = this.userClient.memberHasRoles(member, [socialRole]);
    const socialAccount = this.userClient.findSocialAccount(user, provider);
  }
}
