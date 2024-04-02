import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { QueryBus } from '@nestjs/cqrs';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { FindMyUserQuery } from '@lib/domains/user/application/queries/find-my-user/find-my-user.query';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    private readonly configService: ConfigService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies[`access-token`]]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.queryBus.execute(
      new FindMyUserQuery({
        userId: payload.id,
      }),
    );
  }
}
