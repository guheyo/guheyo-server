import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { SignInUserInput } from '@lib/domains/user/application/commands/sign-in-user/sing-in-user.input';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
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
    const input = req.user as SignInUserInput;
    const user = await this.queryBus.execute(
      new FindUserQuery({
        provider: input.provider,
        socialId: input.socialId,
      }),
    );
    let accessToken: string;
    let refreshToken: string;
    if (user) {
      accessToken = this.jwtService.signAccessToken(
        this.jwtService.parseJwtUser({
          ...input,
          id: user.id,
        }),
      );
      refreshToken = this.jwtService.signRefreshToken(
        this.jwtService.parseJwtUser({
          ...input,
          id: user.id,
        }),
      );
      await this.commandBus.execute(
        new UpdateSocialAccountCommand({
          provider: input.provider,
          socialId: input.socialId,
          accessToken,
          refreshToken,
        }),
      );
    } else {
      const id = uuid4();
      accessToken = this.jwtService.signAccessToken(
        this.jwtService.parseJwtUser({
          ...input,
          id,
        }),
      );
      refreshToken = this.jwtService.signRefreshToken(
        this.jwtService.parseJwtUser({
          ...input,
          id,
        }),
      );
      await this.commandBus.execute(
        new SignInUserCommand({
          ...input,
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
