import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThreadModule } from '../thread.module';

describe('ThreadModule', () => {
  let apiModule: ApiModule;
  let threadModule: ThreadModule;

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
        ThreadModule,
      ],
    }).compile();

    apiModule = moduleRef;
    threadModule = moduleRef.get<ThreadModule>(ThreadModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('ThreadModule', () => {
    it('should be defined', async () => {
      expect(threadModule).toBeDefined();
    });
  });
});
