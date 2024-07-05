import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { ArticleModule } from '../article.module';

describe('ArticleModule', () => {
  let apiModule: ApiModule;
  let articleModule: ArticleModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 100,
          },
        ]),
        ArticleModule,
      ],
    }).compile();

    apiModule = moduleRef;
    articleModule = moduleRef.get<ArticleModule>(ArticleModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('ArticleModule', () => {
    it('should be defined', async () => {
      expect(articleModule).toBeDefined();
    });
  });
});
