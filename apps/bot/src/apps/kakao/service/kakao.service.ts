import { Injectable } from '@nestjs/common';
import { EmbedBuilder, GuildMember, Role } from 'discord.js';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@Injectable()
export class KakaoService {
  constructor(private readonly userClient: UserClient) {}

  private initializeEmbed(): EmbedBuilder {
    return new EmbedBuilder().setAuthor({
      name: '동물의 왕국',
      iconURL: this.userClient.userParser.discordConfigService.getBotIconURL(),
    });
  }

  public async sendKakaoAuthLink(member: GuildMember) {
    const embed = this.initializeEmbed()
      .setTitle('카카오 인증하기')
      .setColor('Blue')
      .setDescription(
        `${member.user.username}님 동물의 왕국에 오신 것을 환영해요!\n카카오 인증이 완료되면 서버 활동을 시작할 수 있어요`,
      )
      .addFields(
        { name: '(1단계) 카카오 인증하기', value: 'https://guheyo.com/setting/profile/kakao' },
        {
          name: '(2단계) "카카오 인증" 역할 받기',
          value: 'https://discord.com/channels/806383744151584779/1062770330432700506',
        },
        {
          name: '카카오 인증 확인 방법',
          value:
            '1. 카카오 인증이 완료되면 웹 프로필 페이지에 카카오 뱃지가 생겨요\n2. 디스코드 서버 프로필에서 "카카오 인증"역할을 확인할 수 있어요',
        },
      );

    await member.send({ embeds: [embed] });
  }

  public async sendRoleAssignmentFailureDM(member: GuildMember) {
    const embed = this.initializeEmbed()
      .setTitle('(1단계 완료) 카카오 인증\n(2단계 실패) "카카오 인증" 역할')
      .setColor('Red')
      .setDescription(
        `${member.user.username}님의 "카카오 인증"역할 발급 과정 중 오류가 발생했어요!\n다시 한번 신청해 주세요`,
      )
      .addFields(
        {
          name: '카카오 인증 역할 받기',
          value: 'https://discord.com/channels/806383744151584779/1062770330432700506',
        },
        {
          name: '카카오 인증 확인 방법',
          value: '카카오 인증 역할은 디스코드 프로필에서 확인할 수 있어요',
        },
      );

    await member.send({ embeds: [embed] });
  }

  public async assignRoleAndNotify(member: GuildMember, socialRole: Role) {
    try {
      await this.userClient.applyRole(member, socialRole);
      await this.sendCompletionDM(member);
    } catch (e) {
      await this.sendRoleAssignmentFailureDM(member);
    }
  }

  public async sendCompletionDM(member: GuildMember) {
    const embed = this.initializeEmbed()
      .setTitle('카카오 인증 완료')
      .setColor('DarkGreen')
      .setDescription(
        `${member.user.username}님의 카카오 인증이 모두 완료되었어요!\n서버 규칙을 확인하고 활동을 시작해 보세요`,
      )
      .addFields({
        name: '규칙 확인하기',
        value: 'https://discord.com/channels/806383744151584779/1056210121082015825',
      });

    await member.send({ embeds: [embed] });
  }
}
