import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { parseAvatarURL } from '@lib/shared/discord/discord.parser';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('oauth2.discord.clientId')!,
      clientSecret: configService.get('oauth2.discord.clientSecret')!,
      callbackURL: configService.get('oauth2.discord.callbackURL')!,
      scope: ['identify'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
      const user = {
        username: profile.username,
        avatarURL: parseAvatarURL(profile.id, profile.avatar) || undefined,
        provider: profile.provider,
        socialId: profile.id,
        accessToken,
        refreshToken,
      };
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
