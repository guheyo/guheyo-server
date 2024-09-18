import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { PlatformModule } from '../platform.module';
import { PlatformResolver } from '../platform.resolver';

describe('PlatformModule', () => {
  let apiModule: ApiModule;
  let tagModule: PlatformModule;
  let resolver: PlatformResolver;

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
        PlatformModule,
      ],
    }).compile();

    apiModule = moduleRef;
    tagModule = moduleRef.get<PlatformModule>(PlatformModule);
    resolver = moduleRef.get<PlatformResolver>(PlatformResolver);
  });

  describe('PlatformApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('PlatformModule', () => {
    it('should be instance of PlatformModule', async () => {
      expect(tagModule).toBeInstanceOf(PlatformModule);
    });
  });

  describe('PlatformResolver', () => {
    it('should be instance of PlatformResolver', async () => {
      expect(resolver).toBeInstanceOf(PlatformResolver);
    });
  });
});
