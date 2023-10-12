import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { UserModule } from './app/user/user.module';
import { SocialAccountModule } from './app/social-account/social-account.module';
import { MemberModule } from './app/member/member.module';
import { RoleModule } from './app/role/role.module';
import { GuildModule } from './app/guild/guild.module';
import { UserImageModule } from './app/user-image/user-image.module';
import { OfferModule } from './app/offer/offer.module';
import { DemandModule } from './app/demand/demand.module';

@Module({
  imports: [
    ConfigYamlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    SocialAccountModule,
    MemberModule,
    RoleModule,
    GuildModule,
    UserImageModule,
    OfferModule,
    DemandModule,
  ],
})
export class ApiModule {}
