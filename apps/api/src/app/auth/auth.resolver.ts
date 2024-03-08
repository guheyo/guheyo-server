import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUser } from '@lib/shared/jwt/jwt.interfaces';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { SocialUserResponse } from '@lib/domains/social-account/application/dtos/social-user.response';
import { JwtRefreshAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-refresh-auth.guard';
import { JwtResponse } from '@lib/domains/auth/guards/jwt/jwt.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
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
    const authUser = req.user as AuthUser;
    const accessToken = this.jwtService.signAccessToken(this.jwtService.parseProfile(authUser));
    const refreshToken = this.jwtService.signRefreshToken(this.jwtService.parseProfile(authUser));
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: authUser.provider,
        socialId: authUser.socialId,
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
    const authUser = req.user as AuthUser;
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: authUser.provider,
        socialId: authUser.socialId,
        accessToken: undefined,
        refreshToken: undefined,
      }),
    );
    this.jwtService.clearAccessTokenCookie(res);
    this.jwtService.clearRefreshTokenCookie(res);
    return new SocialUserResponse({
      provider: authUser.provider,
      socialId: authUser.socialId,
    });
  }
}
