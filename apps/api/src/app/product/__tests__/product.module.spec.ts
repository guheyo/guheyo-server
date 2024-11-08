import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { ProductModule } from '../product.module';
import { ProductResolver } from '../product.resolver';

describe('ProductModule', () => {
  let apiModule: ApiModule;
  let tagModule: ProductModule;
  let resolver: ProductResolver;

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
        ProductModule,
      ],
    }).compile();

    apiModule = moduleRef;
    tagModule = moduleRef.get<ProductModule>(ProductModule);
    resolver = moduleRef.get<ProductResolver>(ProductResolver);
  });

  describe('ProductApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('ProductModule', () => {
    it('should be instance of ProductModule', async () => {
      expect(tagModule).toBeInstanceOf(ProductModule);
    });
  });

  describe('ProductResolver', () => {
    it('should be instance of ProductResolver', async () => {
      expect(resolver).toBeInstanceOf(ProductResolver);
    });
  });
});
