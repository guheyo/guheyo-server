import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';
import { UserCreateHandler } from '@lib/domains/user/application/commands/user-create/user.create.handler';
import { UserUpdateHandler } from '@lib/domains/user/application/commands/user-update/user.update.handler';
import { UserDeleteHandler } from '@lib/domains/user/application/commands/user-delete/user.delete.handler';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { UserModule } from '../user.module';
import { UserResolver } from '../user.resolver';

describe('UserModule', () => {
  let apiModule: ApiModule;
  let userModule: UserModule;
  let resolver: UserResolver;
  let savePort: SavePort<UserEntity>;
  let userCreateHandler: UserCreateHandler;
  let userUpdateHandler: UserUpdateHandler;
  let userDeleteHandler: UserDeleteHandler;

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
    savePort = moduleRef.get<SavePort<UserEntity>>('UserSavePort');
    userCreateHandler = moduleRef.get<UserCreateHandler>(UserCreateHandler);
    userUpdateHandler = moduleRef.get<UserUpdateHandler>(UserUpdateHandler);
    userDeleteHandler = moduleRef.get<UserDeleteHandler>(UserDeleteHandler);
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

  describe('UserUpdateHandler', () => {
    it('should be instance of UserUpdateHandler', async () => {
      expect(userUpdateHandler).toBeInstanceOf(UserUpdateHandler);
    });
  });

  describe('UserDeleteHandler', () => {
    it('should be instance of UserDeleteHandler', async () => {
      expect(userDeleteHandler).toBeInstanceOf(UserDeleteHandler);
    });
  });
});
