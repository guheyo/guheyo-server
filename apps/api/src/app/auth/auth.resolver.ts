import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateSocialAccountCommand } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.command';
import { Payload } from '@lib/shared/jwt/jwt.interfaces';
import { JwtRefreshAuthGuard } from './jwt/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => String, { nullable: true })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Context('req') req: Request, @Context('res') res: Response) {
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
    return res.status(HttpStatus.OK).send();
  }

  @Mutation(() => String, { nullable: true })
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
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
    return res.status(HttpStatus.OK).send();
  }
}
