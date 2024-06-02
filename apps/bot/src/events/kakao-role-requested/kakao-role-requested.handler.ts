import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommandChannelGuard } from '@app/bot/apps/command/guards/command-channel.guard';
import { Name } from '@app/bot/decorators/name.decorator';
import { GuildName } from '@app/bot/decorators/guild-name.decorator';
import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { KakaoService } from '@app/bot/apps/kakao/service/kakao.service';

@GuildName('커스텀 키보드')
@Name('kakao')
@UseGuards(GroupGuard, CommandChannelGuard)
@Injectable()
export class KakaoRoleRequestedHandler {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly userClient: UserClient,
  ) {}

  @On('messageCreate')
  public async onRequestedKakaoRole(
    @Context(ParseUserFromMessagePipe) user: MyUserResponse,
    @Context() [message]: ContextOf<'messageCreate'>,
  ) {
    const { member } = message;
    if (!member || !message.guild) return;

    const provider = 'kakao';
    const socialRole = this.userClient.findSocialRole(await message.guild.roles.fetch(), provider);
    if (!socialRole) return;

    if (this.userClient.memberHasRoles(member, [socialRole])) {
      await this.kakaoService.sendCompletionDM(member);
      return;
    }

    const socialAccount = this.userClient.findSocialAccount(user, provider);
    if (socialAccount) {
      await this.kakaoService.assignRoleAndNotify(member, socialRole);
      return;
    }

    await this.kakaoService.sendKakaoAuthLink(member);
  }
}
