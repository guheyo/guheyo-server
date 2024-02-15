import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@lib/shared';
import { ApiModule } from '@app/api/api.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap(): Promise<void> {
  const expressAdapter = new ExpressAdapter();
  const app = await NestFactory.create(ApiModule, expressAdapter);

  const corsOptions: CorsOptions =
    process.env.NODE_ENV === 'dev'
      ? {
          origin: 'http://localhost:3000',
          credentials: true,
        }
      : {};
  app.enableCors(corsOptions);

  const configService = app.get(ConfigService);
  const serverConfig = configService.get('server');

  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 값은 거르고 에러메세지 출력
      forbidNonWhitelisted: true, // DTO에 존재하지않는 값이 들어오면 에러메세지출력
      transform: true, // 넘어오는값은 무조건 String이라 하나하나 원하는 타입으로 바꿔줘야하는데 이런 불편함을 없애줌
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(passport.initialize());
  app.use(cookieParser());

  await app.listen(serverConfig.port, '0.0.0.0');
}

bootstrap();
