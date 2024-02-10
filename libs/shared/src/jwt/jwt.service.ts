import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { sign } from 'jsonwebtoken';
import { Payload } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(payload: Payload) {
    return sign(payload, this.configService.get('jwt.access.secret')!, {
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });
  }

  signRefreshToken(payload: Payload) {
    return sign(payload, this.configService.get('jwt.refresh.secret')!, {
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });
  }

  getAccessTokenCookieOption(): CookieOptions {
    return {
      sameSite: true,
      httpOnly: true,
      secure: false,
    };
  }

  getRefreshTokenCookieOption(): CookieOptions {
    return {
      sameSite: true,
      httpOnly: true,
      secure: false,
    };
  }
}
