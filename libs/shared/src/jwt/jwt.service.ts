import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import _ from 'lodash';
import { Profile } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(profile: Profile): string {
    return sign(profile, this.configService.get('jwt.access.secret')!, {
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });
  }

  signRefreshToken(profile: Profile): string {
    return sign(profile, this.configService.get('jwt.refresh.secret')!, {
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });
  }

  parseProfile(partial: any): Profile {
    return {
      ..._.pick(partial, ['id', 'username', 'provider', 'socialId', 'avatarURL']),
    };
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.configService.get('jwt.refresh.secret')!);
  }

  getAccessTokenCookieOption(): CookieOptions {
    return {
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      httpOnly: false,
      secure: true, // https, except for localhost
      maxAge: this.configService.get('jwt.access.expiresIn') * 1000, // millisecond
      domain: this.configService.get('jwt.access.domain'), // BE
    };
  }

  getRefreshTokenCookieOption(): CookieOptions {
    return {
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('jwt.refresh.expiresIn') * 1000,
      domain: this.configService.get('jwt.refresh.domain'),
    };
  }

  setAccessTokenCookie(token: string, res: Response) {
    res.cookie('access-token', token, this.getAccessTokenCookieOption());
  }

  setRefreshTokenCookie(token: string, res: Response) {
    res.cookie('refresh-token', token, this.getRefreshTokenCookieOption());
  }

  getRefreshTokenFromCookies(req: Request): string | null {
    return req.cookies?.['refresh-token'];
  }

  clearAccessTokenCookie(res: Response) {
    res.clearCookie('access-token');
  }

  clearRefreshTokenCookie(res: Response) {
    res.clearCookie('refresh-token');
  }
}
