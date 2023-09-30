import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { UserImageModule } from '../user-image.module';

describe('UserImageModule', () => {
  let apiModule: ApiModule;
  let userImageModule: UserImageModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        UserImageModule,
      ],
    }).compile();

    apiModule = moduleRef;
    userImageModule = moduleRef.get<UserImageModule>(UserImageModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('UserImageModule', () => {
    it('should be defined', async () => {
      expect(userImageModule).toBeDefined();
    });
  });
});
