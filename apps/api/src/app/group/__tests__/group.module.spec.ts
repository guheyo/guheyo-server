import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { GroupModule } from '../group.module';
import { GroupResolver } from '../group.resolver';

describe('GroupModule', () => {
  let apiModule: ApiModule;
  let groupModule: GroupModule;
  let resolver: GroupResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        GroupModule,
      ],
    }).compile();

    apiModule = moduleRef;
    groupModule = moduleRef.get<GroupModule>(GroupModule);
    resolver = moduleRef.get<GroupResolver>(GroupResolver);
  });

  describe('GroupApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('GroupModule', () => {
    it('should be instance of GroupModule', async () => {
      expect(groupModule).toBeInstanceOf(GroupModule);
    });
  });

  describe('GroupResolver', () => {
    it('should be instance of GroupResolver', async () => {
      expect(resolver).toBeInstanceOf(GroupResolver);
    });
  });
});
