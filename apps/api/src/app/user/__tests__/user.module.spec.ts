import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserSavePort } from '@lib/domains/user/application/port/out/user.save.port';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { UserCreateHandler } from '@lib/domains/user/application/commands/user-create/user.create.handler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { UserModule } from '../user.module';
import { UserResolver } from '../user.resolver';

describe('UserModule', () => {
  let apiModule: ApiModule;
  let userModule: UserModule;
  let resolver: UserResolver;
  let savePort: UserSavePort;
  let userCreateHandler: UserCreateHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        UserModule,
      ],
    }).compile();

    apiModule = moduleRef;
    userModule = moduleRef.get<UserModule>(UserModule);
    resolver = moduleRef.get<UserResolver>(UserResolver);
    savePort = moduleRef.get<UserSavePort>('UserSavePort');
    userCreateHandler = moduleRef.get<UserCreateHandler>(UserCreateHandler);
  });

  describe('UserApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('UserModule', () => {
    it('should be instance of UserModule', async () => {
      expect(userModule).toBeInstanceOf(UserModule);
    });
  });

  describe('UserResolver', () => {
    it('should be instance of UserResolver', async () => {
      expect(resolver).toBeInstanceOf(UserResolver);
    });
  });

  describe('UserSavePort', () => {
    it('should be instance of UserCommandRepository', async () => {
      expect(savePort).toBeInstanceOf(UserCommandRepository);
    });
  });

  describe('UserCreateHandler', () => {
    it('should be instance of UserCreateHandler', async () => {
      expect(userCreateHandler).toBeInstanceOf(UserCreateHandler);
    });
  });
});
