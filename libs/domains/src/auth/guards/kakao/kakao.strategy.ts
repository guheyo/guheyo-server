import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('oauth2.kakao.clientId')!,
      clientSecret: configService.get('oauth2.kakao.clientSecret')!,
      callbackURL: configService.get('oauth2.kakao.callbackURL')!,
      scope: [],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
      const user = {
        provider: profile.provider,
        socialId: String(profile.id), // convert kakao's Int id into String
        // name: profile.response?.name,
        // phoneNumber: profile.response?.mobile_e164,
      };
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
