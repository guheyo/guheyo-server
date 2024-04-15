import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { TagModule } from '../tag.module';
import { TagResolver } from '../tag.resolver';

describe('TagModule', () => {
  let apiModule: ApiModule;
  let tagModule: TagModule;
  let resolver: TagResolver;

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
        TagModule,
      ],
    }).compile();

    apiModule = moduleRef;
    tagModule = moduleRef.get<TagModule>(TagModule);
    resolver = moduleRef.get<TagResolver>(TagResolver);
  });

  describe('TagApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('TagModule', () => {
    it('should be instance of TagModule', async () => {
      expect(tagModule).toBeInstanceOf(TagModule);
    });
  });

  describe('TagResolver', () => {
    it('should be instance of TagResolver', async () => {
      expect(resolver).toBeInstanceOf(TagResolver);
    });
  });
});
