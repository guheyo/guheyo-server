import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { ConfigService } from '@nestjs/config';
import { SocialProfile } from '@lib/shared/jwt/jwt.interfaces';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { MultiPlatformGuard } from '@lib/domains/auth/guards/multi-platform/multi-platform.guard';
import { get } from 'lodash';
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
    const user = (await this.queryBus.execute(
      new FindUserQuery({
        provider: socialProfile.provider,
        socialId: socialProfile.id,
      }),
    )) as UserResponse | null;

    let accessToken: string;
    let refreshToken: string;
    if (user) {
      accessToken = this.jwtService.signAccessToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id: user.id,
        username: user.username,
        avatarURL: user.avatarURL || undefined,
      });
      refreshToken = this.jwtService.signRefreshToken({
        socialProfile: this.jwtService.parseSocialProfile(socialProfile),
        id: user.id,
        username: user.username,
        avatarURL: user.avatarURL || undefined,
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
  @UseGuards(new MultiPlatformGuard('naver'))
  async naverLoginCallback(@Req() req: any, @Res() res: Response) {
    await this.commandBus.execute(
      new CreateSocialAccountCommand({
        id: uuid4(),
        provider: get(req.user, 'socialData.naver.provider'),
        socialId: get(req.user, 'socialData.naver.socialId'),
        userId: req.user.id,
      }),
    );
    return res.redirect(
      `${this.configService.get(`frontend.host`)!}:${this.configService.get(
        'frontend.port',
      )}/setting/profile/naver`,
    );
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaodLogin(@Res() res: Response) {
    return res.status(HttpStatus.OK).send();
  }

  @Get('kakao/callback')
  @UseGuards(new MultiPlatformGuard('kakao'))
  async kakaoLoginCallback(@Req() req: any, @Res() res: Response) {
    await this.commandBus.execute(
      new CreateSocialAccountCommand({
        id: uuid4(),
        provider: get(req.user, 'socialData.kakao.provider'),
        socialId: get(req.user, 'socialData.kakao.socialId'),
        userId: req.user.id,
      }),
    );
    return res.redirect(
      `${this.configService.get(`frontend.host`)!}:${this.configService.get(
        'frontend.port',
      )}/setting/profile/kakao`,
    );
  }
}
