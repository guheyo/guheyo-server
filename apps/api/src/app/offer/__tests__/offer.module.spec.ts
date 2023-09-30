import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { OfferModule } from '../offer.module';

describe('OfferModule', () => {
  let apiModule: ApiModule;
  let offerModule: OfferModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        OfferModule,
      ],
    }).compile();

    apiModule = moduleRef;
    offerModule = moduleRef.get<OfferModule>(OfferModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  })

  describe('OfferModule', () => {
    it('should be defined', async () => {
      expect(offerModule).toBeDefined();
    });
  });
});
