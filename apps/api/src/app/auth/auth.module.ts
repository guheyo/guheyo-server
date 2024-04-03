import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@lib/shared/jwt/jwt.service';
import { AUTH_STRATEGIES } from '@lib/domains/auth/guards/auth.strategies';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [CqrsModule, PrismaModule, PassportModule.register({}), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthResolver, JwtService, ...AUTH_STRATEGIES],
})
export class AuthModule {}
