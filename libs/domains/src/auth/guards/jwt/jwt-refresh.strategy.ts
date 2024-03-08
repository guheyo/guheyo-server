import { FindSocialAccountQuery } from '@lib/domains/social-account/application/queries/find-social-account/find-social-account.query';
import { UserPayload } from '@lib/shared/jwt/jwt.interfaces';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies[`refresh-token`]]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refresh.secret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserPayload) {
    const oldRefreshToken = this.jwtService.getRefreshTokenFromCookies(req)!;
    const socialAccount = await this.queryBus.execute(
      new FindSocialAccountQuery({
        provider: payload.provider,
        socialId: payload.socialId,
        refreshToken: oldRefreshToken,
      }),
    );
    if (!socialAccount) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
