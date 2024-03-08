import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('oauth2.naver.clientId')!,
      clientSecret: configService.get('oauth2.naver.clientSecret')!,
      callbackURL: configService.get('oauth2.naver.callbackURL')!,
      scope: ['identify'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
      const user = {
        provider: profile.provider,
        socialId: profile.id,
        // name: profile.response?.name,
        // phoneNumber: profile.response?.mobile_e164,
      };
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
