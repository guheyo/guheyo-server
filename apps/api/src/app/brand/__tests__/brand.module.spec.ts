import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { BrandModule } from '../brand.module';
import { BrandResolver } from '../brand.resolver';

describe('BrandModule', () => {
  let apiModule: ApiModule;
  let tagModule: BrandModule;
  let resolver: BrandResolver;

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
        BrandModule,
      ],
    }).compile();

    apiModule = moduleRef;
    tagModule = moduleRef.get<BrandModule>(BrandModule);
    resolver = moduleRef.get<BrandResolver>(BrandResolver);
  });

  describe('BrandApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('BrandModule', () => {
    it('should be instance of BrandModule', async () => {
      expect(tagModule).toBeInstanceOf(BrandModule);
    });
  });

  describe('BrandResolver', () => {
    it('should be instance of BrandResolver', async () => {
      expect(resolver).toBeInstanceOf(BrandResolver);
    });
  });
});
