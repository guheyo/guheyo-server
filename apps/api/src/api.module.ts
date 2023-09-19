import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { UserModule } from './app/user/user.module';
import { SocialAccountModule } from './app/social-account/social-account.module';
import { MemberModule } from './app/member/member.module';

@Module({
  imports: [
    ConfigYamlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    UserModule,
    SocialAccountModule,
    MemberModule,
  ],
})
export class ApiModule {}
