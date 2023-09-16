import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { SocialAccountResponse } from '@lib/domains/social-account/application/dtos/social-account.response';
import { MemberResponse } from '@lib/domains/member/application/dtos/member.response';
import { UserResponse } from './user.response';

@ObjectType()
export class MyUserResponse extends UserResponse {
  @Type(() => SocialAccountResponse)
  @Field(() => [SocialAccountResponse], { nullable: true })
  socialAccounts: SocialAccountResponse[];

  @Type(() => MemberResponse)
  @Field(() => [MemberResponse], { nullable: true })
  members: MemberResponse[];

  constructor(partial: Partial<MyUserResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
