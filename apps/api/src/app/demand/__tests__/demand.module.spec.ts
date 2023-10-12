import { ApiModule } from '@app/api/api.module';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { DemandModule } from '../demand.module';

describe('DemandModule', () => {
  let apiModule: ApiModule;
  let demandModule: DemandModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        DemandModule,
      ],
    }).compile();

    apiModule = moduleRef;
    demandModule = moduleRef.get<DemandModule>(DemandModule);
  });

  describe('ApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('DemandModule', () => {
    it('should be defined', async () => {
      expect(demandModule).toBeDefined();
    });
  });
});
