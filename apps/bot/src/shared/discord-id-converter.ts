import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v5 as uuid5 } from 'uuid';

@Injectable()
export class DiscordIdConverter {
  constructor(private readonly configService: ConfigService) {}

  toGuildId(discordGuildId: string) {
    return uuid5(discordGuildId, this.configService.get('namespace.discord')!);
  }

  toSocialAccountId(discordUserId: string) {
    return uuid5(discordUserId, this.configService.get('namespace.discord')!);
  }

  toMemberId(discordUserId: string) {
    return uuid5(discordUserId, this.configService.get('namespace.guild')!);
  }

  toRoleId(discordRoleId: string) {
    return uuid5(discordRoleId, this.configService.get('namespace.guild')!);
  }
}
