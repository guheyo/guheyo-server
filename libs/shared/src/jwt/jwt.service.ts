import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import _ from 'lodash';
import { SignInUserInput } from '@lib/domains/user/application/commands/sign-in-user/sing-in-user.input';
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

  parseJwtUserFromPayload(payload: Payload): JwtUser {
    return _.pick(payload, ['username', 'provider', 'socialId', 'avatarURL']);
  }

  parseJwtUserFromSignInUserInput(input: SignInUserInput): JwtUser {
    return _.pick(input, ['username', 'provider', 'socialId', 'avatarURL']);
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.configService.get('jwt.refresh.secret')!);
  }

  getAccessTokenCookieOption(): CookieOptions {
    return {
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      httpOnly: true,
      secure: true, // https, except for localhost
      maxAge: this.configService.get('jwt.access.expiresIn'),
      domain: this.configService.get('jwt.access.domain'), // BE
    };
  }

  getRefreshTokenCookieOption(): CookieOptions {
    return {
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('jwt.refresh.expiresIn'),
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
