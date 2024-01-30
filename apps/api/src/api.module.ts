import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
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
      },
    }),
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
  ],
})
export class ApiModule {}
