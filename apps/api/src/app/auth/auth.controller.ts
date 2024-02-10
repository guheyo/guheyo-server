import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import _ from 'lodash';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { SignInUserInput } from '@lib/domains/user/application/commands/sign-in-user/sing-in-user.input';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@lib/shared/jwt/jwt.service';

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
    const user = await this.findUserBySocialAccount(input.provider, input.socialId);
    if (user) {
      res.status(HttpStatus.OK).send();
      return;
    }

    await this.commandBus.execute(
      new SignInUserCommand({
        ...input,
        id: uuid4(),
      }),
    );
    this.jwtService.setJwtCookies(
      {
        username: input.username,
        avatarURL: input.avatarURL,
      },
      res,
    );
    res.status(HttpStatus.OK).send();
  }

  private findUserBySocialAccount(provider: string, socialId: string) {
    return this.queryBus.execute(
      new FindUserQuery({
        provider,
        socialId,
      }),
    );
  }
}
