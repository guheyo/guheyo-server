import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { HttpStatus, UseGuards } from '@nestjs/common';
import _ from 'lodash';
import { Request, Response } from 'express';
import { FindSocialAccountQuery } from '@lib/domains/social-account/application/queries/find-social-account/find-social-account.query';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { Payload } from '@lib/shared/jwt/jwt.interfaces';
import { JwtRefreshAuthGuard } from './jwt/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => String, { nullable: true })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Context('req') req: Request, @Context('res') res: Response) {
    const oldRefreshToken = this.jwtService.getRefreshTokenFromCookies(req);
    if (!oldRefreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = _.pick(this.jwtService.verifyRefreshToken(oldRefreshToken) as Payload, [
      'username',
      'provider',
      'socialId',
      'avatarURL',
    ]);
    const socialAccount = await this.queryBus.execute(
      new FindSocialAccountQuery({
        provider: payload.provider,
        socialId: payload.socialId,
        refreshToken: oldRefreshToken,
      }),
    );
    if (!socialAccount) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const accessToken = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        id: socialAccount.id,
        accessToken,
        refreshToken,
      }),
    );
    this.jwtService.setAccessTokenCookie(accessToken, res);
    this.jwtService.setRefreshTokenCookie(refreshToken, res);
    return res.status(HttpStatus.OK).send();
  }

  @Mutation(() => String, { nullable: true })
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    const oldRefreshToken = this.jwtService.getRefreshTokenFromCookies(req);
    if (!oldRefreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    const payload = _.pick(this.jwtService.verifyRefreshToken(oldRefreshToken) as Payload, [
      'username',
      'provider',
      'socialId',
      'avatarURL',
    ]);
    const socialAccount = await this.queryBus.execute(
      new FindSocialAccountQuery({
        provider: payload.provider,
        socialId: payload.socialId,
        refreshToken: oldRefreshToken,
      }),
    );
    if (!socialAccount) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        id: socialAccount.id,
        accessToken: undefined,
        refreshToken: undefined,
      }),
    );
    this.jwtService.clearAccessTokenCookie(res);
    this.jwtService.clearRefreshTokenCookie(res);
    return res.status(HttpStatus.OK).send();
  }
}
