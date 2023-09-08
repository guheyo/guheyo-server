import { Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
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

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field()
  username: string;

  @Type(() => SocialAccountEntity)
  @Field(() => [SocialAccountEntity], { nullable: true })
  socialAccounts: SocialAccountEntity[];

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field()
  bot: boolean;

  @Type(() => MemberEntity)
  @Field(() => [MemberEntity], { nullable: true })
  members: MemberEntity[];
}
