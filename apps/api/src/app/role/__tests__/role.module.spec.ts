import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { RoleModule } from '../role.module';
import { RoleResolver } from '../role.resolver';

describe('RoleModule', () => {
  let apiModule: ApiModule;
  let roleModule: RoleModule;
  let resolver: RoleResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        RoleModule,
      ],
    }).compile();

    apiModule = moduleRef;
    roleModule = moduleRef.get<RoleModule>(RoleModule);
    resolver = moduleRef.get<RoleResolver>(RoleResolver);
  });

  describe('RoleApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('RoleModule', () => {
    it('should be instance of RoleModule', async () => {
      expect(roleModule).toBeInstanceOf(RoleModule);
    });
  });

  describe('RoleResolver', () => {
    it('should be instance of RoleResolver', async () => {
      expect(resolver).toBeInstanceOf(RoleResolver);
    });
  });
});
