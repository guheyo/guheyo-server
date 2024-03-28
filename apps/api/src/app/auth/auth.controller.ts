import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { ConfigService } from '@nestjs/config';
import { SocialProfile } from '@lib/shared/jwt/jwt.interfaces';
import { ThrottlerBehindProxyGuard } from '../throttler/throttler-behind-proxy.guard';

@UseGuards(ThrottlerBehindProxyGuard)
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  discordLogin(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordLoginCallback(@Req() req: any, @Res() res: Response) {
    const socialProfile = req.user as SocialProfile;
    const user = await this.queryBus.execute(
      new FindUserQuery({
        provider: socialProfile.provider,
        socialId: socialProfile.id,
      }),
    );
    let accessToken: string;
    let refreshToken: string;
    if (user) {
      accessToken = this.jwtService.signAccessToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id: user.id,
        username: user.username,
        avatarURL: user.avatarURL,
      });
      refreshToken = this.jwtService.signRefreshToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id: user.id,
        username: user.username,
        avatarURL: user.avatarURL,
      });
      await this.commandBus.execute(
        new UpdateSocialAccountCommand({
          provider: socialProfile.provider,
          socialId: socialProfile.id,
          accessToken,
          refreshToken,
        }),
      );
    } else {
      const id = uuid4();
      accessToken = this.jwtService.signAccessToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id,
        username: socialProfile.username,
        avatarURL: socialProfile.avatarURL,
      });
      refreshToken = this.jwtService.signRefreshToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id,
        username: socialProfile.username,
        avatarURL: socialProfile.avatarURL,
      });
      await this.commandBus.execute(
        new SignInUserCommand({
          socialId: socialProfile.id,
          username: socialProfile.username,
          provider: socialProfile.provider,
          avatarURL: socialProfile.avatarURL,
          id,
          accessToken,
          refreshToken,
        }),
      );
    }
    this.jwtService.setAccessTokenCookie(accessToken, res);
    this.jwtService.setRefreshTokenCookie(refreshToken, res);
    return res.redirect(
      `${this.configService.get(`frontend.host`)!}:${this.configService.get('frontend.port')}`,
    );
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverdLogin(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req: any, @Res() res: Response) {
    // TODO
  }
}
