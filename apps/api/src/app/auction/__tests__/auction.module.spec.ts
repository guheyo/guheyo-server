import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { AuctionModule } from '../auction.module';

describe('AuctionModule', () => {
  let apiModule: ApiModule;
  let auctionModule: AuctionModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        AuctionModule,
      ],
    }).compile();

    apiModule = moduleRef;
    auctionModule = moduleRef.get<AuctionModule>(AuctionModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('AuctionModule', () => {
    it('should be defined', async () => {
      expect(auctionModule).toBeDefined();
    });
  });
});
