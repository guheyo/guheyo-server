import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { SocialAccountResponse } from '@lib/domains/social-account/application/dtos/social-account.response';
import { MemberWithRolesResponse } from '@lib/domains/member/application/dtos/member-with-roles.response';
import { UserResponse } from './user.response';

@ObjectType()
export class MyUserResponse extends UserResponse {
  @Type(() => SocialAccountResponse)
  @Field(() => [SocialAccountResponse])
  socialAccounts: SocialAccountResponse[];

  @Type(() => MemberWithRolesResponse)
  @Field(() => [MemberWithRolesResponse])
  members: MemberWithRolesResponse[];

  constructor(partial: Partial<MyUserResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
