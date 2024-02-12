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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin(): Promise<void> {
    // do nothing
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordLoginCallback(@Req() req: any, @Res() res: Response) {
    const input = req.user as SignInUserInput;
    const jwtUser = this.jwtService.parseJwtUserFromSignInUserInput(input);
    const accessToken = this.jwtService.signAccessToken(jwtUser);
    const refreshToken = this.jwtService.signRefreshToken(jwtUser);
    const user = await this.queryBus.execute(
      new FindUserQuery({
        provider: jwtUser.provider,
        socialId: jwtUser.socialId,
      }),
    );
    if (user) {
      await this.commandBus.execute(
        new UpdateSocialAccountCommand({
          provider: jwtUser.provider,
          socialId: jwtUser.socialId,
          accessToken,
          refreshToken,
        }),
      );
    } else {
      await this.commandBus.execute(
        new SignInUserCommand({
          ...input,
          id: uuid4(),
          accessToken,
          refreshToken,
        }),
      );
    }
    this.jwtService.setAccessTokenCookie(accessToken, res);
    this.jwtService.setRefreshTokenCookie(refreshToken, res);
    res.status(HttpStatus.OK).send();
  }
}
