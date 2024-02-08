import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

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
    const user = {
      username: profile.username,
      provider: profile.provider,
      socialId: profile.id,
      email: profile.email,
      accessToken,
      refreshToken,
    };
    try {
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
