import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
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
  async discordLoginCallback(@Req() req: any, @Res() res: Response): Promise<void> {
    // TODO
  }
}
