import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SocialAccountRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.repository';
import { CreateSocialAccountHandler } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.handler';
import { UpdateSocialAccountHandler } from '@lib/domains/social-account/application/commands/update-social-account/update-social-account.handler';
import { DeleteSocialAccountHandler } from '@lib/domains/social-account/application/commands/delete-social-account/delete-social-account.handler';
import { SocialAccountLoadPort } from '@lib/domains/social-account/application/ports/out/social-account.load.port';
import { SocialAccountSavePort } from '@lib/domains/social-account/application/ports/out/social-account.save.port';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { SocialAccountModule } from '../social-account.module';
import { SocialAccountResolver } from '../social-account.resolver';

describe('SocialAccountModule', () => {
  let apiModule: ApiModule;
  let socialAccountModule: SocialAccountModule;
  let resolver: SocialAccountResolver;
  let socialAccountLoadPort: SocialAccountLoadPort;
  let socialAccountSavePort: SocialAccountSavePort;
  let socialAccountCreateHandler: CreateSocialAccountHandler;
  let socialAccountUpdateHandler: UpdateSocialAccountHandler;
  let socialAccountDeleteHandler: DeleteSocialAccountHandler;

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
        SocialAccountModule,
      ],
    }).compile();

    apiModule = moduleRef;
    socialAccountModule = moduleRef.get<SocialAccountModule>(SocialAccountModule);
    resolver = moduleRef.get<SocialAccountResolver>(SocialAccountResolver);
    socialAccountLoadPort = moduleRef.get<SocialAccountLoadPort>('SocialAccountLoadPort');
    socialAccountSavePort = moduleRef.get<SocialAccountSavePort>('SocialAccountSavePort');
    socialAccountCreateHandler = moduleRef.get<CreateSocialAccountHandler>(
      CreateSocialAccountHandler,
    );
    socialAccountUpdateHandler = moduleRef.get<UpdateSocialAccountHandler>(
      UpdateSocialAccountHandler,
    );
    socialAccountDeleteHandler = moduleRef.get<DeleteSocialAccountHandler>(
      DeleteSocialAccountHandler,
    );
  });

  describe('SocialAccountModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('SocialAccountModule', () => {
    it('should be instance of SocialAccountModule', async () => {
      expect(socialAccountModule).toBeInstanceOf(SocialAccountModule);
    });
  });

  describe('SocialAccountResolver', () => {
    it('should be instance of SocialAccountResolver', async () => {
      expect(resolver).toBeInstanceOf(SocialAccountResolver);
    });
  });

  describe('SocialAccountLoadPort', () => {
    it('should be instance of SocialAccountCommandRepository', async () => {
      expect(socialAccountLoadPort).toBeInstanceOf(SocialAccountRepository);
    });
  });

  describe('SocialAccountSavePort', () => {
    it('should be instance of SocialAccountCommandRepository', async () => {
      expect(socialAccountSavePort).toBeInstanceOf(SocialAccountRepository);
    });
  });

  describe('CreateSocialAccountHandler', () => {
    it('should be instance of CreateSocialAccountHandler', async () => {
      expect(socialAccountCreateHandler).toBeInstanceOf(CreateSocialAccountHandler);
    });
  });

  describe('UpdateSocialAccountHandler', () => {
    it('should be instance of UpdateSocialAccountHandler', async () => {
      expect(socialAccountUpdateHandler).toBeInstanceOf(UpdateSocialAccountHandler);
    });
  });

  describe('DeleteSocialAccountHandler', () => {
    it('should be instance of DeleteSocialAccountHandler', async () => {
      expect(socialAccountDeleteHandler).toBeInstanceOf(DeleteSocialAccountHandler);
    });
  });
});
