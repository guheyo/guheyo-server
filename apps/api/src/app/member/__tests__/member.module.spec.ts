import { Test } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { MemberCommandRepository } from '@lib/domains/member/adapter/out/persistence/member.command.repository';
import { CreateMemberHandler } from '@lib/domains/member/application/commands/create-member/create-member.handler';
import { UpdateMemberHandler } from '@lib/domains/member/application/commands/update-member/update-member.handler';
import { DeleteMemberHandler } from '@lib/domains/member/application/commands/delete-member/delete-member.handler';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { FindMemberByUserAndGuildHandler } from '@lib/domains/member/application/queries/find-member-by-user-and-guild/find-member-by-user-and-guild.handler';
import { ApiModule } from '../../../api.module';
import { ConfigYamlModule } from '../../../config/config.module';
import { MemberModule } from '../member.module';
import { MemberResolver } from '../member.resolver';

describe('MemberModule', () => {
  let apiModule: ApiModule;
  let memberModule: MemberModule;
  let resolver: MemberResolver;
  let savePort: SavePort<MemberEntity>;
  let memberCreateHandler: CreateMemberHandler;
  let memberUpdateHandler: UpdateMemberHandler;
  let memberDeleteHandler: DeleteMemberHandler;
  let findMemberByUserAndGuildHandler: FindMemberByUserAndGuildHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
        }),
        MemberModule,
      ],
    }).compile();

    apiModule = moduleRef;
    memberModule = moduleRef.get<MemberModule>(MemberModule);
    resolver = moduleRef.get<MemberResolver>(MemberResolver);
    savePort = moduleRef.get<SavePort<MemberEntity>>('MemberSavePort');
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
    it('should be instance of UserCommandRepository', async () => {
      expect(savePort).toBeInstanceOf(MemberCommandRepository);
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
