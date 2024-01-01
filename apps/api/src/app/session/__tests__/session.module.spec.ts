import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SessionLoadPort } from '@lib/domains/session/application/port/out/session.load.port';
import { SessionSavePort } from '@lib/domains/session/application/port/out/session.save.port';
import { CreateSessionHandler } from '@lib/domains/session/application/commands/create-session/create-session.handler';
import { UpdateSessionHandler } from '@lib/domains/session/application/commands/update-session/update-session.handler';
import { DeleteSessionHandler } from '@lib/domains/session/application/commands/delete-session/delete-session.handler';
import { SessionRepository } from '@lib/domains/session/adapter/out/persistence/session.repository';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { SessionModule } from '../session.module';
import { SessionResolver } from '../session.resolver';

describe('SesionModule', () => {
  let apiModule: ApiModule;
  let sesionModule: SessionModule;
  let resolver: SessionResolver;
  let sessionLoadPort: SessionLoadPort;
  let sessionSavePort: SessionSavePort;
  let sessionCreateHandler: CreateSessionHandler;
  let sessionUpdateHandler: UpdateSessionHandler;
  let sessionDeleteHandler: DeleteSessionHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        SessionModule,
      ],
    }).compile();

    apiModule = moduleRef;
    sesionModule = moduleRef.get<SessionModule>(SessionModule);
    resolver = moduleRef.get<SessionResolver>(SessionResolver);
    sessionLoadPort = moduleRef.get<SessionLoadPort>('SessionLoadPort');
    sessionSavePort = moduleRef.get<SessionSavePort>('SessionSavePort');
    sessionCreateHandler = moduleRef.get<CreateSessionHandler>(CreateSessionHandler);
    sessionUpdateHandler = moduleRef.get<UpdateSessionHandler>(UpdateSessionHandler);
    sessionDeleteHandler = moduleRef.get<DeleteSessionHandler>(DeleteSessionHandler);
  });

  describe('SesionModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('SesionModule', () => {
    it('should be instance of SesionModule', async () => {
      expect(sesionModule).toBeInstanceOf(SessionModule);
    });
  });

  describe('SessionResolver', () => {
    it('should be instance of SessionResolver', async () => {
      expect(resolver).toBeInstanceOf(SessionResolver);
    });
  });

  describe('SessionLoadPort', () => {
    it('should be instance of SessionCommandRepository', async () => {
      expect(sessionLoadPort).toBeInstanceOf(SessionRepository);
    });
  });

  describe('SessionSavePort', () => {
    it('should be instance of SessionCommandRepository', async () => {
      expect(sessionSavePort).toBeInstanceOf(SessionRepository);
    });
  });

  describe('SessionHandler', () => {
    it('should be instance of SessionHandler', async () => {
      expect(sessionCreateHandler).toBeInstanceOf(CreateSessionHandler);
    });
  });

  describe('SessionHandler', () => {
    it('should be instance of SessionHandler', async () => {
      expect(sessionUpdateHandler).toBeInstanceOf(UpdateSessionHandler);
    });
  });

  describe('SessionHandler', () => {
    it('should be instance of SessionHandler', async () => {
      expect(sessionDeleteHandler).toBeInstanceOf(DeleteSessionHandler);
    });
  });
});
