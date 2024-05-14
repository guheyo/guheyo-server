import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigYamlModule } from '@app/api/config/config.module';
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
import { GraphQLJSON } from 'graphql-type-json';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/role/role.module';
import { GroupModule } from './app/group/group.module';
import { UserImageModule } from './app/user-image/user-image.module';
import { OfferModule } from './app/offer/offer.module';
import { TermModule } from './app/term/term.module';
import { AuthModule } from './app/auth/auth.module';
import { CommonModule } from './app/common/common.module';
import { ReportModule } from './app/report/report.module';
import { CommentModule } from './app/comment/comment.module';
import { VersionModule } from './app/version/version.module';
import { SocialAccountModule } from './app/social-account/social-account.module';
import { BumpModule } from './app/bump/bump.module';
import { DiscordWebhookModule } from './app/discord-webhook/discord-webhook.module';
import { UserReviewModule } from './app/user-review/user-review.module';
import { TagModule } from './app/tag/tag.module';
import { PostModule } from './app/post/post.module';
import { EmojiModule } from './app/emoji/emoji.module';
import { ReactionModule } from './app/reaction/reaction.module';

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
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // milliseconds
        limit: 100,
      },
    ]),
    AuthModule,
    SocialAccountModule,
    CommonModule,
    UserModule,
    RoleModule,
    GroupModule,
    UserImageModule,
    OfferModule,
    BumpModule,
    TermModule,
    ReportModule,
    PostModule,
    CommentModule,
    VersionModule,
    DiscordWebhookModule,
    UserReviewModule,
    TagModule,
    EmojiModule,
    ReactionModule,
  ],
})
export class ApiModule {}
