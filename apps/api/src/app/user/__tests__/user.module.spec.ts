import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserSavePort } from '@lib/domains/user/application/ports/out/user.save.port';
import { UserLoadPort } from '@lib/domains/user/application/ports/out/user.load.port';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { FindMyUserByIdHandler } from '@lib/domains/user/application/queries/find-my-user-by-id/find-my-user-by-id.handler';
import { FindUserHandler } from '@lib/domains/user/application/queries/find-user/find-user.handler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { UserModule } from '../user.module';
import { UserResolver } from '../user.resolver';

describe('UserModule', () => {
  let apiModule: ApiModule;
  let userModule: UserModule;
  let resolver: UserResolver;
  let userSavePort: UserSavePort;
  let userLoadPort: UserLoadPort;
  let userCreateHandler: CreateUserHandler;
  let userUpdateHandler: UpdateUserHandler;
  let userDeleteHandler: DeleteUserHandler;
  let findMyUserByIdHandler: FindMyUserByIdHandler;
  let findUserHandler: FindUserHandler;

  beforeAll(async () => {
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
    userSavePort = moduleRef.get<UserSavePort>('UserSavePort');
    userLoadPort = moduleRef.get<UserLoadPort>('UserLoadPort');
    userCreateHandler = moduleRef.get<CreateUserHandler>(CreateUserHandler);
    userUpdateHandler = moduleRef.get<UpdateUserHandler>(UpdateUserHandler);
    userDeleteHandler = moduleRef.get<DeleteUserHandler>(DeleteUserHandler);
    findMyUserByIdHandler = moduleRef.get<FindMyUserByIdHandler>(FindMyUserByIdHandler);
    findUserHandler = moduleRef.get<FindUserHandler>(FindUserHandler);
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
    it('should be instance of UserRepository', async () => {
      expect(userSavePort).toBeInstanceOf(UserRepository);
    });
  });

  describe('UserLoadPort', () => {
    it('should be instance of UserRepository', async () => {
      expect(userLoadPort).toBeInstanceOf(UserRepository);
    });
  });

  describe('CreateUserHandler', () => {
    it('should be instance of CreateUserHandler', async () => {
      expect(userCreateHandler).toBeInstanceOf(CreateUserHandler);
    });
  });

  describe('UpdateUserHandler', () => {
    it('should be instance of UpdateUserHandler', async () => {
      expect(userUpdateHandler).toBeInstanceOf(UpdateUserHandler);
    });
  });

  describe('DeleteUserHandler', () => {
    it('should be instance of DeleteUserHandler', async () => {
      expect(userDeleteHandler).toBeInstanceOf(DeleteUserHandler);
    });
  });

  describe('FindMyUserByIdHandler', () => {
    it('should be instance of FindMyUserByIdHandler', async () => {
      expect(findMyUserByIdHandler).toBeInstanceOf(FindMyUserByIdHandler);
    });
  });

  describe('FindUserHandler', () => {
    it('should be instance of FindUserHandler', async () => {
      expect(findUserHandler).toBeInstanceOf(FindUserHandler);
    });
  });
});
