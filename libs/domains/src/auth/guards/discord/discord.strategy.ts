import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { parseAvatarURL } from '@lib/shared/discord/discord.parser';
import { SocialProfile } from '@lib/shared/jwt/jwt.interfaces';

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
      const socialProfile: SocialProfile = {
        id: profile.id,
        username: profile.username,
        provider: profile.provider,
        avatarURL: parseAvatarURL(profile.id, profile.avatar) || undefined,
      };
      done(null, socialProfile);
    } catch (err) {
      done(err);
    }
  }
}
