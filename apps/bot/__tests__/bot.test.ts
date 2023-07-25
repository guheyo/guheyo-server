import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigYamlModule } from '@lib/config/config-yaml.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import { BotController } from '~bot/src/controllers/bot.controller';
import { Interfaces } from '~bot/src/interfaces';

describe('Bot API (e2e)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigYamlModule],
      controllers: [BotController],
      providers: [...Interfaces],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('Bot API', () => {
    it('findOne', () => request(app.getHttpServer()).get('/bot/1033').expect(HttpStatus.OK));
  });
});
