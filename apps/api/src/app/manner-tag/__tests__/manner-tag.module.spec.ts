import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { MannerTagModule } from '../manner-tag.module';
import { MannerTagResolver } from '../manner-tag.resolver';

describe('MannerTagModule', () => {
  let apiModule: ApiModule;
  let mannerTagModule: MannerTagModule;
  let resolver: MannerTagResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 100,
          },
        ]),
        MannerTagModule,
      ],
    }).compile();

    apiModule = moduleRef;
    mannerTagModule = moduleRef.get<MannerTagModule>(MannerTagModule);
    resolver = moduleRef.get<MannerTagResolver>(MannerTagResolver);
  });

  describe('MannerTagApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('MannerTagModule', () => {
    it('should be instance of MannerTagModule', async () => {
      expect(mannerTagModule).toBeInstanceOf(MannerTagModule);
    });
  });

  describe('MannerTagResolver', () => {
    it('should be instance of MannerTagResolver', async () => {
      expect(resolver).toBeInstanceOf(MannerTagResolver);
    });
  });
});
