import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigYamlModule } from "@lib/config/config-yaml.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import request from "supertest";
import { Interfaces } from "~apis/src/interfaces";
import { UserController } from "~apis/src/controllers/user.controller";

describe("API (e2e)", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigYamlModule],
      controllers: [UserController],
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

  describe("User API", () => {
    it("findOne", () => {
      return request(app.getHttpServer()).get("/user/1033").expect(HttpStatus.OK);
    });
  });
});
