import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { GuildModule } from '../guild.module';
import { GuildResolver } from '../guild.resolver';

describe('GuildModule', () => {
  let apiModule: ApiModule;
  let guildModule: GuildModule;
  let resolver: GuildResolver;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        GuildModule,
      ],
    }).compile();

    apiModule = moduleRef;
    guildModule = moduleRef.get<GuildModule>(GuildModule);
    resolver = moduleRef.get<GuildResolver>(GuildResolver);
  });

  describe('GuildApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('GuildModule', () => {
    it('should be instance of GuildModule', async () => {
      expect(guildModule).toBeInstanceOf(GuildModule);
    });
  });

  describe('GuildResolver', () => {
    it('should be instance of GuildResolver', async () => {
      expect(resolver).toBeInstanceOf(GuildResolver);
    });
  });
});
