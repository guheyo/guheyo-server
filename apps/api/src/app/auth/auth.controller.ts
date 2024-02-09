import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { SignInUserInput } from '@lib/domains/user/application/commands/sign-in-user/sing-in-user.input';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { DiscordAuthGuard } from './discord/discord-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async discordLogin(): Promise<void> {
    // do nothing
  }

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  async discordLoginCallback(@Req() req: any): Promise<UserResponse | null> {
    const input = req.user as SignInUserInput;
    const user = await this.findUserBySocialAccount(input.provider, input.socialId);
    if (user) return user;

    await this.commandBus.execute(
      new SignInUserCommand({
        ...input,
        id: uuid4(),
      }),
    );
    const newUser = await this.findUserBySocialAccount(input.provider, input.socialId);
    return newUser;
  }

  findUserBySocialAccount(provider: string, socialId: string) {
    return this.queryBus.execute(
      new FindUserQuery({
        provider,
        socialId,
      }),
    );
  }
}
