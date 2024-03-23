import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
import { GraphQLJSON } from 'graphql-type-json';
import { UserModule } from './app/user/user.module';
import { SocialAccountModule } from './app/social-account/social-account.module';
import { MemberModule } from './app/member/member.module';
import { RoleModule } from './app/role/role.module';
import { GroupModule } from './app/group/group.module';
import { UserImageModule } from './app/user-image/user-image.module';
import { OfferModule } from './app/offer/offer.module';
import { DemandModule } from './app/demand/demand.module';
import { SwapModule } from './app/swap/swap.module';
import { AuctionModule } from './app/auction/auction.module';
import { DiscordMessageModule } from './app/discord-message/discord-message.module';
import { SessionModule } from './app/session/session.module';
import { TermModule } from './app/term/term.module';
import { AuthModule } from './app/auth/auth.module';
import { CommonModule } from './app/common/common.module';
import { BumpModule } from './app/bump/bump.module';
import { ReportModule } from './app/report/report.module';
import { CommentModule } from './app/comment/comment.module';
import { VersionModule } from './app/version/version.module';

@Module({
  imports: [
    ConfigYamlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
      typeDefs: [DateTimeTypeDefinition],
      resolvers: {
        DateTime: DateTimeResolver,
        JSON: GraphQLJSON,
      },
      context: (context: any) => context,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // milliseconds
        limit: 100,
      },
    ]),
    AuthModule,
    CommonModule,
    UserModule,
    SocialAccountModule,
    MemberModule,
    RoleModule,
    GroupModule,
    UserImageModule,
    OfferModule,
    DemandModule,
    SwapModule,
    AuctionModule,
    DiscordMessageModule,
    SessionModule,
    TermModule,
    BumpModule,
    ReportModule,
    CommentModule,
    VersionModule,
  ],
})
export class ApiModule {}
