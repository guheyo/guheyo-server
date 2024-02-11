import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Payload } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(payload: Payload): string {
    return sign(payload, this.configService.get('jwt.access.secret')!, {
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });
  }

  signRefreshToken(payload: Payload): string {
    return sign(payload, this.configService.get('jwt.refresh.secret')!, {
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });
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
}
