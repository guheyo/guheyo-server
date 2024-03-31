import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { SocialUserResponse } from '@lib/domains/social-account/application/dtos/social-user.response';
import { JwtRefreshAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-refresh-auth.guard';
import { JwtResponse } from '@lib/domains/auth/guards/jwt/jwt.response';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { FindAuthUserQuery } from '@lib/domains/user/application/queries/find-auth-user/find-auth-user.query';
import { AuthUserResponse } from '@lib/domains/user/application/dtos/auth-user.response';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class AuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => JwtResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshTokens(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<JwtResponse> {
    const jwtPayload = req.user as JwtPayload;
    const userPayload = this.jwtService.parseUserPayload(jwtPayload);
    const accessToken = this.jwtService.signAccessToken(userPayload);
    const refreshToken = this.jwtService.signRefreshToken(userPayload);
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: jwtPayload.socialProfile.provider,
        socialId: jwtPayload.socialProfile.id,
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

  @Mutation(() => JwtResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async reGenerateTokens(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<JwtResponse> {
    const jwtPayload = req.user as JwtPayload;
    const user = (await this.queryBus.execute(
      new FindAuthUserQuery({
        provider: jwtPayload.socialProfile.provider,
        socialId: jwtPayload.socialProfile.id,
      }),
    )) as AuthUserResponse | null;
    if (!user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    const userPayload = {
      socialProfile: jwtPayload.socialProfile,
      id: user.id,
      username: user.username,
      avatarURL: user.avatarURL || undefined,
      rootRoleNames: user.rootRoleNames,
    };

    const accessToken = this.jwtService.signAccessToken(userPayload);
    const refreshToken = this.jwtService.signRefreshToken(userPayload);
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: jwtPayload.socialProfile.provider,
        socialId: jwtPayload.socialProfile.id,
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
    const jwtPayload = req.user as JwtPayload;
    await this.commandBus.execute(
      new UpdateSocialAccountCommand({
        provider: jwtPayload.socialProfile.provider,
        socialId: jwtPayload.socialProfile.id,
        accessToken: undefined,
        refreshToken: undefined,
      }),
    );
    this.jwtService.clearAccessTokenCookie(res);
    this.jwtService.clearRefreshTokenCookie(res);
    return new SocialUserResponse({
      provider: jwtPayload.socialProfile.provider,
      socialId: jwtPayload.socialProfile.id,
    });
  }
}
