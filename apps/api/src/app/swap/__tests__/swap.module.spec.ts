import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { SwapModule } from '../swap.module';

describe('SwapModule', () => {
  let apiModule: ApiModule;
  let swapModule: SwapModule;

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
        SwapModule,
      ],
    }).compile();

    apiModule = moduleRef;
    swapModule = moduleRef.get<SwapModule>(SwapModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('SwapModule', () => {
    it('should be defined', async () => {
      expect(swapModule).toBeDefined();
    });
  });
});
