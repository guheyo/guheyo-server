import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { AuthResolver } from './auth.resolver';
import { JwtAccessStrategy } from './jwt/jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './discord/discord.strategy';

@Module({
  imports: [CqrsModule, PrismaModule, PassportModule.register({}), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthResolver, JwtAccessStrategy, JwtRefreshStrategy, JwtService, DiscordStrategy],
})
export class AuthModule {}
