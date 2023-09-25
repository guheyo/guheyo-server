import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, RequestMethod, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@lib/shared';
import { ApiModule } from '@app/api/api.module';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(ApiModule, fastifyAdapter);

  const configService = app.get(ConfigService);
  const serverConfig = configService.get('server');

  app.enableShutdownHooks();

  app.useGlobalFilters(new HttpExceptionFilter()); // 전역 필터 적용

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'check_health', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 값은 거르고 에러메세지 출력
      forbidNonWhitelisted: true, // DTO에 존재하지않는 값이 들어오면 에러메세지출력
      transform: true, // 넘어오는값은 무조건 String이라 하나하나 원하는 타입으로 바꿔줘야하는데 이런 불편함을 없애줌
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(serverConfig.port, '0.0.0.0');
}

bootstrap();
