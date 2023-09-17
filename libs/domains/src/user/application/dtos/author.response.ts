import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountWithoutAuthEntity } from '@lib/domains/social-account/domain/social-account.without-auth.entity';
import { UserResponse } from './user.response';

@ObjectType()
export class AuthorResponse extends UserResponse {
  @Type(() => SocialAccountWithoutAuthEntity)
  @Field(() => [SocialAccountWithoutAuthEntity], { nullable: true })
  socialAccounts: SocialAccountWithoutAuthEntity[];

  @Type(() => MemberEntity)
  @Field(() => [MemberEntity], { nullable: true })
  members: MemberEntity[];

  constructor(partial: Partial<AuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
