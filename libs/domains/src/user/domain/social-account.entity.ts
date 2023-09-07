import { Field, GraphQLISODateTime, ID, Int } from '@nestjs/graphql';
import { SocialAccount } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SocialAccountEntity implements SocialAccount {
  constructor(partial: Partial<SocialAccountEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Exclude()
  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;

  @Field()
  provider: string;

  @Field()
  socialId: string;

  @Field()
  userId: string;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => Int, { nullable: true })
  expiresAt: number | null;

  @Field(() => String, { nullable: true })
  tokenType: string | null;

  @Field(() => String, { nullable: true })
  scope: string | null;

  @Field(() => String, { nullable: true })
  idToken: string | null;

  @Field(() => String, { nullable: true })
  sessionState: string | null;
}
