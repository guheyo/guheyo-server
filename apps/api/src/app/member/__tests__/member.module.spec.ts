import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MemberRepository } from '@lib/domains/member/adapter/out/persistence/member.repository';
import { CreateMemberHandler } from '@lib/domains/member/application/commands/create-member/create-member.handler';
import { UpdateMemberHandler } from '@lib/domains/member/application/commands/update-member/update-member.handler';
import { DeleteMemberHandler } from '@lib/domains/member/application/commands/delete-member/delete-member.handler';
import { FindMemberByUserAndGuildHandler } from '@lib/domains/member/application/queries/find-member-by-user-and-guild/find-member-by-user-and-guild.handler';
import { MemberSavePort } from '@lib/domains/member/application/ports/out/member.save.port';
import { MemberLoadPort } from '@lib/domains/member/application/ports/out/member.load.port';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { MemberModule } from '../member.module';
import { MemberResolver } from '../member.resolver';

describe('MemberModule', () => {
  let apiModule: ApiModule;
  let memberModule: MemberModule;
  let resolver: MemberResolver;
  let memberSavePort: MemberSavePort;
  let memberLoadPort: MemberLoadPort;
  let memberCreateHandler: CreateMemberHandler;
  let memberUpdateHandler: UpdateMemberHandler;
  let memberDeleteHandler: DeleteMemberHandler;
  let findMemberByUserAndGuildHandler: FindMemberByUserAndGuildHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        PrismaModule,
        MemberModule,
      ],
    }).compile();

    apiModule = moduleRef;
    memberModule = moduleRef.get<MemberModule>(MemberModule);
    resolver = moduleRef.get<MemberResolver>(MemberResolver);
    memberSavePort = moduleRef.get<MemberSavePort>('MemberSavePort');
    memberLoadPort = moduleRef.get<MemberLoadPort>('MemberLoadPort');
    memberCreateHandler = moduleRef.get<CreateMemberHandler>(CreateMemberHandler);
    memberUpdateHandler = moduleRef.get<UpdateMemberHandler>(UpdateMemberHandler);
    memberDeleteHandler = moduleRef.get<DeleteMemberHandler>(DeleteMemberHandler);
    findMemberByUserAndGuildHandler = moduleRef.get<FindMemberByUserAndGuildHandler>(
      FindMemberByUserAndGuildHandler,
    );
  });

  describe('MemberApiModule', () => {
    it('should be defined', async () => {
      expect(apiModule).toBeDefined();
    });
  });

  describe('MemberModule', () => {
    it('should be instance of MemberModule', async () => {
      expect(memberModule).toBeInstanceOf(MemberModule);
    });
  });

  describe('MemberResolver', () => {
    it('should be instance of MemberResolver', async () => {
      expect(resolver).toBeInstanceOf(MemberResolver);
    });
  });

  describe('MemberSavePort', () => {
    it('should be instance of UserRepository', async () => {
      expect(memberSavePort).toBeInstanceOf(MemberRepository);
    });
  });

  describe('MemberLoadPort', () => {
    it('should be instance of UserRepository', async () => {
      expect(memberLoadPort).toBeInstanceOf(MemberRepository);
    });
  });

  describe('CreateMemberHandler', () => {
    it('should be instance of CreateMemberHandler', async () => {
      expect(memberCreateHandler).toBeInstanceOf(CreateMemberHandler);
    });
  });

  describe('UpdateMemberHandler', () => {
    it('should be instance of UpdateMemberHandler', async () => {
      expect(memberUpdateHandler).toBeInstanceOf(UpdateMemberHandler);
    });
  });

  describe('DeleteMemberHandler', () => {
    it('should be instance of DeleteMemberHandler', async () => {
      expect(memberDeleteHandler).toBeInstanceOf(DeleteMemberHandler);
    });
  });

  describe('FindMemberByUserAndGuildHandler', () => {
    it('should be instance of FindMemberByUserAndGuildHandler', async () => {
      expect(findMemberByUserAndGuildHandler).toBeInstanceOf(FindMemberByUserAndGuildHandler);
    });
  });
});
