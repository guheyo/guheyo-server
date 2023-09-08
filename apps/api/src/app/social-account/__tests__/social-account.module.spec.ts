import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SocialAccountSavePort } from '@lib/domains/social-account/application/port/out/social-account.save.port';
import { SocialAccountCommandRepository } from '@lib/domains/social-account/adapter/out/persistence/social-account.command.repository';
import { SocialAccountCreateHandler } from '@lib/domains/social-account/application/commands/social-account-create/social-account.create.handler';
import { SocialAccountUpdateHandler } from '@lib/domains/social-account/application/commands/social-account-update/social-account.update.handler';
import { SocialAccountDeleteHandler } from '@lib/domains/social-account/application/commands/social-account-delete/social-account.delete.handler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { SocialAccountModule } from '../social-account.module';
import { SocialAccountResolver } from '../social-account.resolver';

describe('SocialAccountModule', () => {
  let apiModule: ApiModule;
  let socialAccountModule: SocialAccountModule;
  let resolver: SocialAccountResolver;
  let savePort: SocialAccountSavePort;
  let socialAccountCreateHandler: SocialAccountCreateHandler;
  let socialAccountUpdateHandler: SocialAccountUpdateHandler;
  let socialAccountDeleteHandler: SocialAccountDeleteHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        SocialAccountModule,
      ],
    }).compile();

    apiModule = moduleRef;
    socialAccountModule = moduleRef.get<SocialAccountModule>(SocialAccountModule);
    resolver = moduleRef.get<SocialAccountResolver>(SocialAccountResolver);
    savePort = moduleRef.get<SocialAccountSavePort>('SocialAccountSavePort');
    socialAccountCreateHandler = moduleRef.get<SocialAccountCreateHandler>(
      SocialAccountCreateHandler,
    );
    socialAccountUpdateHandler = moduleRef.get<SocialAccountUpdateHandler>(
      SocialAccountUpdateHandler,
    );
    socialAccountDeleteHandler = moduleRef.get<SocialAccountDeleteHandler>(
      SocialAccountDeleteHandler,
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

  describe('SocialAccountSavePort', () => {
    it('should be instance of SocialAccountCommandRepository', async () => {
      expect(savePort).toBeInstanceOf(SocialAccountCommandRepository);
    });
  });

  describe('SocialAccountCreateHandler', () => {
    it('should be instance of SocialAccountCreateHandler', async () => {
      expect(socialAccountCreateHandler).toBeInstanceOf(SocialAccountCreateHandler);
    });
  });

  describe('SocialAccountUpdateHandler', () => {
    it('should be instance of SocialAccountUpdateHandler', async () => {
      expect(socialAccountUpdateHandler).toBeInstanceOf(SocialAccountUpdateHandler);
    });
  });

  describe('SocialAccountDeleteHandler', () => {
    it('should be instance of SocialAccountDeleteHandler', async () => {
      expect(socialAccountDeleteHandler).toBeInstanceOf(SocialAccountDeleteHandler);
    });
  });
});
