import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Payload } from '@lib/shared/jwt/jwt.interfaces';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { SocialUserResponse } from '@lib/domains/social-account/application/dtos/social-user.response';
import { JwtRefreshAuthGuard } from './jwt/jwt-refresh-auth.guard';
import { JwtResponse } from './jwt/jwt.response';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => JwtResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshTokens(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<JwtResponse> {
    const jwtUser = this.jwtService.parseJwtUserFromPayload(req.user as Payload);
    const accessToken = this.jwtService.signAccessToken(jwtUser);
    const refreshToken = this.jwtService.signRefreshToken(jwtUser);
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: jwtUser.provider,
        socialId: jwtUser.socialId,
        accessToken,
        refreshToken,
      }),
    );
    this.jwtService.setAccessTokenCookie(accessToken, res);
    this.jwtService.setRefreshTokenCookie(refreshToken, res);
    return new JwtResponse({
      accessToken,
      refreshToken,
    });
  }

  @Mutation(() => SocialUserResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async logout(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<SocialUserResponse> {
    const jwtUser = this.jwtService.parseJwtUserFromPayload(req.user as Payload);
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: jwtUser.provider,
        socialId: jwtUser.socialId,
        accessToken: undefined,
        refreshToken: undefined,
      }),
    );
    this.jwtService.clearAccessTokenCookie(res);
    this.jwtService.clearRefreshTokenCookie(res);
    return new SocialUserResponse({
      provider: jwtUser.provider,
      socialId: jwtUser.socialId,
    });
  }
}
