import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import _ from 'lodash';
import { JwtUser, Payload } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(jwtUser: JwtUser): string {
    return sign(jwtUser, this.configService.get('jwt.access.secret')!, {
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });
  }

  signRefreshToken(jwtUser: JwtUser): string {
    return sign(jwtUser, this.configService.get('jwt.refresh.secret')!, {
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });
  }

  parseJwtUser(payload: Payload): JwtUser {
    return _.pick(payload, ['username', 'provider', 'socialId', 'avatarURL']);
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.configService.get('jwt.refresh.secret')!);
  }

  getAccessTokenCookieOption(): CookieOptions {
    return {
      sameSite: true,
      httpOnly: true,
      secure: process.env.NOTE_ENV === 'production',
    };
  }

  getRefreshTokenCookieOption(): CookieOptions {
    return {
      sameSite: true,
      httpOnly: true,
      secure: process.env.NOTE_ENV === 'production',
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
