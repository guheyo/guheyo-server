import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies[`access-token`]]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
